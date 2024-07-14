import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';
import { title } from 'process';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('customContent') customContent !: TemplateRef<any> 

  textoDeInput:string ='';
  viewName:boolean = false;

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  callModal(){

    const CURRENTINPUTVALUE = this.textoDeInput;


    const MODALSAVE = this.matDialog.open( ModalComponent,{
      width:'auto',
      height:'auto',
      data:{

        title:'Agrega tu nombre',
        content:this.customContent,
        showContent: true,
        contentText: 'Aqui va el texto' ,
        showContentText:false,
        cancelButtonText:'Cancelar',
        showCancelButtonText:true,
        aceptButtonText : 'Aceptar',
        showAcceptButtonText:true
      }
    } )

    MODALSAVE.afterClosed().subscribe( resp=>{
      console.log( resp );

      if( resp == "Aceptar" ){

        this.viewName = true;
        
      }else if( resp == "Cancelar" ){
        this.textoDeInput = CURRENTINPUTVALUE;
        this.viewName = true;
      }
      else{
        this.textoDeInput = CURRENTINPUTVALUE;
        
        this.viewName = true;
      }

      console.log( this.textoDeInput );
      
      
      
    } )
  }

  // Las letras “a” por el número 4, la letra “e” por el número 3, la letra “i” por el número 1, la letra “o”
// por el número 0 y la letra “u” por el número 9.
// Ejemplo: "para un tipo de contraseña" => "p4r4 9n t1p0 d3 c0ntr4s3ñ4"
}
