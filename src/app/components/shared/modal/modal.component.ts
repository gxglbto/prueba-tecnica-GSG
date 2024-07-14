import { Component, Inject, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ModalComponent implements OnInit {


  title:string = '';
  content !:TemplateRef<any>;
  showContent :boolean = false;
  
  contentText : string = ''
  showContentText : boolean = false;
  cancelButtonText : string = ''
  showCancelButtonText : boolean = false;
  aceptButtonText : string = ''
  showAcceptButtonText : boolean = false;

  constructor( 
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject( MAT_DIALOG_DATA ) public data:any
  ) { 
    this.title = data.title

    this.content = data.content
    this.showContent = data.showContent

    this.contentText = data.contentText;
    this.showContentText = data.showContentText;
    this.cancelButtonText = data.cancelButtonText;
    this.showCancelButtonText = data.showCancelButtonText;
    this.aceptButtonText = data.aceptButtonText;
    this.showAcceptButtonText = data.showAcceptButtonText;
    dialogRef.disableClose = true;

  }

  ngOnInit(): void {
  }

  closeModal( text:string ){
    this.dialogRef.close( text )
  }

}
