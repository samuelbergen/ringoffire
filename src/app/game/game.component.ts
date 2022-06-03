import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { interval } from 'rxjs';
import { throttle } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  gameOver = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((p) => {
      console.log(p["id"]);
      this.gameId = p["id"];

      this.firestore.collection('games').doc(this.gameId).valueChanges().pipe(throttle(() => interval(500))).subscribe((game: any) => {
        console.log('Game update:', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    })
  }

  newGame() {
    this.game = new Game;
  }

  takeCard() {
    if (this.game.players.length >= 2) {
      if (this.game.stack.length == 0) {
        this.gameOver = true;
      }
      else if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        console.log('New card: ' + this.game.currentCard);
        console.log('Game is: ', this.game);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          this.saveGame();
        }, 1000)
      }
    }
    else {
      this.openDialog();
    }
  }

  openDialog(): void {
    if (this.game.players.length < 10) {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this.game.players.push({
            'name': data.name,
            'profilePicture': data.profilePicture
          });
          this.saveGame();
        }
      });
    }
    else {
      alert('You can\'t add more players');
    }
  }

  startNewGame() {
    let game = new Game();
    this.firestore.collection('games').add(game.toJson()).then((gameInfo: any) => {
      console.log(gameInfo.id);
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
    this.gameOver = false;
  }

  saveGame() {
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJson());
  }

}
