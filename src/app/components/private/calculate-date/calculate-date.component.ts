import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TypeDate } from './interfaces/date'; 
import { log } from 'console';


@Component({
  selector: 'app-calculate-date',
  templateUrl: './calculate-date.component.html',
  styleUrls: ['./calculate-date.component.css']
})
export class CalculateDateComponent implements OnInit {

  formDate !: FormGroup
  dateFinish: any;
  
  optionsDate : TypeDate [] = [
    { clue:'A', description: 'Año' },
    { clue:'M', description: 'Mes' },
    { clue:'D', description: 'Día' },
  ]

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {    
    this.createForm();
  }

  createForm(){
    this.formDate = this.fb.group( {
      dateForm        : ['', Validators.required],
      selectTypeForm  : ['', Validators.required],
      quantityForm    : ['', Validators.required],
    } )
  }


  dateChange( event:any ){
    this.validForm();
  }


  selectTypeDate( event:any ){
    this.formDate.get('selectTypeForm')?.setValue( event.value );
    this.validForm();
  }

  onlyNumber(event:any){
    console.log( event.keyCode );
    
    if( event.keyCode >= 48 && event.keyCode <= 57 || (event.keyCode == 8) ){

      return true;
    }else{
      return false;
    }
  }

  addDate( event : any ){
    this.validForm();

  }


  validForm(){

    if( this.formDate.invalid ){
      this.dateFinish = "";

    }else{
      this.convertDate( 
          this.formDate.get('dateForm')?.value ,
          this.formDate.get('quantityForm')?.value, 
          this.formDate.get('selectTypeForm')?.value.clue )

    }

  }


  convertDate( date:any , quantityForm : number , typeDate:string){
    
    let dateConvert = new Date( date );
    let day = dateConvert.getDate();
    let month = dateConvert.getMonth(); //van de 0-11
    let year = dateConvert.getFullYear();
      
    switch( typeDate ){
      case 'A': year  += Number(quantityForm); break;
      case 'M': month += Number(quantityForm); break;
      case 'D': day   += Number(quantityForm); break;
    }
    
    console.log( new Date( year, month, day ) );

    this.dateFinish = new Date( year, month, day );
  
  }


}//fin clase
