import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  form: FormGroup;

  profilePictures: string[] = [
    'profile_picture.png',
    'profile_picture_man.png',
    'profile_picture_woman.png',
    'profile_picture_man_2.png',
    'profile_picture_woman_2.png',
    'profile_picture_penguin.png'
  ];

  standardProfilePicture = this.profilePictures[0];

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {
    this.form = this.formBuilder.group({ name: '', profilePicture: this.standardProfilePicture })
  }

  ngOnInit(): void {
  }
}
