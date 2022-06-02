import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }


  newGame() {
    // Start game
    let game = new Game();
    this.firestore.collection('games').add(game.toJson()).then((gameInfo: any) => {
      console.log(gameInfo.id);
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}
