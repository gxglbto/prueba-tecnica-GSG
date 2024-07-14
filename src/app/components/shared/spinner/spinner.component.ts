import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogMessage {
  message:string;
}

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<SpinnerComponent>,
    @Inject( MAT_DIALOG_DATA ) public data : DialogMessage
  ) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
