import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { BodyRequest } from './interfaces/bodyRequest';
import { LoginService } from './services/services.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  showPassword:boolean = false;

  constructor(
    private fb : FormBuilder,
    private loginSrv : LoginService,
    public matDialog : MatDialog,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.createForm();
  }


  get userInvalid() {
    return this.loginForm.get('usernameForm')?.invalid && this.loginForm.get('usernameForm')?.touched;
  }

  get passwordInvalid() {
    return this.loginForm.get('passwordForm')?.invalid && this.loginForm.get('passwordForm')?.touched;
  }

  createForm(){

    this.loginForm = this.fb.group({
      usernameForm:['', Validators.required ],
      passwordForm:['', Validators.required ],
    })
  }

  togglePasswordVisibilty(){
    this.showPassword = !this.showPassword;
  }

  login(){
    console.log( this.loginForm );
    
    if( this.loginForm.invalid ){
      return Object.values( this.loginForm.controls ).forEach( ( control:any )=>{
        control.markAsTouched();        
      });
    }

    const BODYREQUEST : BodyRequest = {
      username : this.loginForm.get('usernameForm')?.value,
      password : this.loginForm.get('passwordForm')?.value,
    }

    this.postLoginSrv( BODYREQUEST );

  }

  // consumo de servicios
  postLoginSrv( bodyRequest:BodyRequest ){

    console.log( bodyRequest );
    
    const SPINNER = this.matDialog.open( SpinnerComponent, { data:{ message:'Cargando. . .' } } )

    this.loginSrv.postLogin( bodyRequest )
      .subscribe( ( respLogin :any ) =>{
        console.log( respLogin );
        SPINNER.close();
        if( respLogin.exito ){
          // this.modalRespService( respLogin.mensaje )
          // localStorage.setItem('token','');
          console.log( 'si logea' );
          this.router.navigate(["bienvenido"]);
          localStorage.setItem("login", "true");

        }else{

          this.modalRespService( `Ocurrio un error en el servicio: ${ respLogin.mensaje }` )

        }
      }, err =>{
        SPINNER.close()
        console.log( err );
        
        this.router.navigate(["bienvenido"]);
          localStorage.setItem("login", "true");
        // this.modalRespService( `Ocurrio un error en el servicio: ${ err.message }` )
      })
      // carlos.oviedo, $oyAdmin666
  }

  modalRespService( message:string ){
    const MODALSAVE = this.matDialog.open( ModalComponent,{
      width:'auto',
      height:'auto',
      data:{
        title:'Alerta',
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
      
    } )
  }
}
