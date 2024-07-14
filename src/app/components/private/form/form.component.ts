import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { LoginService } from '../../login/services/services.service';
import { MatDialog } from '@angular/material/dialog';
import { FormService } from './services/form.service';
import { log } from 'console';
import { Validadores } from './services/validadores';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  reactiveForm !: FormGroup;
  matcher = new MyErrorStateMatcher()

  maritalStatusCatalog : any [] =[
    {
      clue:"1",
      description:"opcion 1"
    },
    {
      clue:"2",
      description:"opcion 2"
    },
    {
      clue:"3",
      description:"opcion 3"
    },
  ]



  constructor(
    private fb : FormBuilder,
    public matDialog : MatDialog,
    private formSrv : FormService,
    private customFormValidation : Validadores
  ) { 
    
  }
  


  ngOnInit(): void {

    this.getCatalogoSrv();
  
    this.createForm();
  }

  getCatalogoSrv(){
    this.formSrv.getCatalogoEstadoCivil()
      .subscribe( (respSrv :any) =>{
        console.log( respSrv );
        
      },
    err =>{

    } )
  }

  campoVacio( nameControl:string ) {
    
    if( (
        this.reactiveForm.get( nameControl )?.value == '' || 
        this.reactiveForm.get( nameControl )?.value == null ) && 
        this.reactiveForm.get( nameControl )?.touched

      ){
        
      return true
    }
    else{
      
      return false;
    }
  }

  get fumarInvalid(){
    return this.reactiveForm.get('fumas')?.invalid && this.reactiveForm.get('fumas')?.touched;
  }
  get actualmentePracticasLecturaInvalid(){
    return this.reactiveForm.get('actualmentePracticasLectura')?.invalid && this.reactiveForm.get('actualmentePracticasLectura')?.touched;
  }
  get librosLeidos(){
    return this.reactiveForm.get('librosLeidosUltimosTresMeses') as FormArray;
  }

  createForm(){
    this.reactiveForm = this.fb.group({

      nombres                     : ["", [Validators.required, this.customFormValidation.withoutSpaceToFinish ]] ,
      apellidos                   : ["", [Validators.required, this.customFormValidation.withoutSpaceToFinish ]] ,
      fumas                       : ["", Validators.required] ,//true/false,
      actualmentePracticasLectura : ["", Validators.required], //true/false,
      librosLeidosUltimosTresMeses: 
        this.fb.array( [this.fb.control('',Validators.required)]  ),
      
      estadoCivil                 : [""],


    })

    this.reactiveForm.get('librosLeidosUltimosTresMeses')?.disable();
  
  }

  addControl(){
    this.librosLeidos.push( this.fb.control("", Validators.required) );
  }

  removeBook(i:number){
    this.librosLeidos.removeAt( i );
  }

  getVisibleBtnAdd( index:number ): boolean{
    
    if( this.librosLeidos.controls.length-1 == index ){
      return true;
    }
    return false;
  }

  getValidBtnRemove( index:number ): boolean{

    if( this.librosLeidos.controls.length == 1 ){
      return false;
    }

    return true;
  }

  // ya esta de mas la validacion-funciona sacando el mat
  getHaveSpaceThisText( nameControl:string ) : boolean {

    

    if( this.reactiveForm.get( nameControl )?.errors == null ){
      return false;
    }
    else if( this.reactiveForm.get( nameControl )?.value =='' ||  this.reactiveForm.get( nameControl )?.value == null){
      return false;
    }
    else if(this.reactiveForm.get( nameControl )?.errors !== null ){

      
      return true;
    }
    else{
      return true;
    }
  }


  withoutSpace( event:any ){
    console.log( event.target.value );

    let textoWithoutSpace = event.target.value
    console.log( textoWithoutSpace );
    
    if( event.target.value !== textoWithoutSpace.trim() ){
      console.log( 'hay espacios al principio o al final' );
      
    }else{
      console.log( 'debe pasar bien' );
      
    }
    
    console.log( this.reactiveForm.get('nombres') );
    console.log( this.reactiveForm.get('nombres')?.errors  );
    
  }

  changeValue( value:boolean , nameControl:string){
    this.reactiveForm.get( nameControl )?.setValue( value )
    
    if( nameControl !== "fumas" ){
      value ? this.reactiveForm.get('librosLeidosUltimosTresMeses')?.enable() :
            this.reactiveForm.get('librosLeidosUltimosTresMeses')?.disable() 
    
    }
  }

  selectTypeMaritalStatus( event:any ){
    this.reactiveForm.get('estadoCivil')?.setValue( event.value );
    
  }

  submitForm(){
    


    if( this.reactiveForm.invalid ){
      this.modalAlert("El formulario es incorrecto, por favor valida los campos requeridos",false)

      return Object.values( this.reactiveForm.controls ).forEach( ( control:any )=>{
        control.markAsTouched();        
      });
    }

    this.modalAlert("El formulario es correcto, ¿deseas continuar para enviar la información?", true)
    
    
  }

  resetForm(){
    this.reactiveForm.reset();
    
    
    this.librosLeidos.controls = [];
    this.librosLeidos.push( this.fb.control("", Validators.required) ) 
    
  }


  modalAlert( message:string , formValid:boolean){
    const MODALALERT = this.matDialog.open( ModalComponent,{
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
    
    MODALALERT.afterClosed()
      .subscribe( (resp:string) =>{

        if( resp =="Aceptar" && formValid){
          // this.resetForm();
          this.postForm();
          // se hace proceso de envio de informacion
        }
      } )
  }


  postForm(){
    

    const FORMVALUE = this.reactiveForm.value;
    

    const BODYREQ :any = {
      nombres : FORMVALUE.nombres,
      apellidos : FORMVALUE.apellidos ,
      fumas : FORMVALUE.fumas,
      actualmentePracticasLectura : FORMVALUE.actualmentePracticasLectura,
      librosLeidosUltimosTresMeses : FORMVALUE.librosLeidosUltimosTresMeses,
      estadoCivil : FORMVALUE.estadoCivil,
    }

    
  }


}
