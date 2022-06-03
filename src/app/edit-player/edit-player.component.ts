import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../player/player.component';
import { Player } from 'src/models/player.class';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  player: Player;

  profilePictures: string[] = [
    'profile_picture.png',
    'profile_picture_man.png',
    'profile_picture_woman.png',
    'profile_picture_man_2.png',
    'profile_picture_woman_2.png',
    'profile_picture_penguin.png'
  ];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.player = data;
  }

  ngOnInit(): void {
  }
}