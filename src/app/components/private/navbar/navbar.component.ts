import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggleActivate:boolean = false;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    
    this.modalConfirmLogout( '¿Deseas cerrar sesión?' )
    
  }

  get isLoggin(){

    const ISLOGIN : boolean | any = localStorage.getItem("login");
    
    if( ISLOGIN == "true"){

      return true
    }    
    return false;

  }

  modalConfirmLogout( message:string ){
    const MODALSAVE = this.matDialog.open( ModalComponent,{
      width:'400px',
      height:'auto',
      data:{
        title:'Cerrar sesión',
        contentText: message ,
        showContentText:true,
        cancelButtonText:'Cancelar',
        showCancelButtonText:true,
        aceptButtonText : 'Aceptar',
        showAcceptButtonText:true
      }
    } )

    MODALSAVE.afterClosed().subscribe( resp=>{
      console.log( resp );

      if( resp == "Aceptar" ){
        localStorage.clear();
        this.router.navigate(["login"]);
      }
      
    } )
  }

  

  

}
