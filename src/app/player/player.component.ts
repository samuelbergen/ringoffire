import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

export interface DialogData {
  name: string;
  profilePicture: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
@Input() playerActive: boolean = false;
@Input() player: any;
@Input() i: number;
@Input() game: Game;
@Input() firestore: AngularFirestore;
@Input() gameId: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editPlayer(i: number): void {
    let dialogRef = this.dialog.open(EditPlayerComponent,
      {
        data: {
          name: this.player.name,
          profilePicture: this.player.profilePicture
        }
      });
    dialogRef.afterClosed().subscribe(edit => {
      if (edit == 'DELETE') {
        this.game.players.splice(i, 1);
      } else if (edit) {
        this.game.players[i].name = edit.name;
        this.game.players[i].profilePicture = edit.profilePicture;
      }
      this.saveGame();
    })
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}
