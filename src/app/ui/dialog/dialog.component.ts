import { Component, Inject, OnInit } from '@angular/core';
import { DialogData } from '../../core/shared/dialog-data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DialogComponent>,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
