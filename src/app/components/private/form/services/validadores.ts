import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

@Injectable({
    providedIn: 'root'
  })
export class Validadores {

    constructor( ){}
    

    withoutSpaceToFinish( control:FormControl ) : null | { [s:string]:boolean }  {

        control.value

        let textoWithoutSpace = control.value;
        
        

        if(textoWithoutSpace == null) {
            console.log( 'el texto es null' );
            
            return null
        }
        if( control.value !== textoWithoutSpace.trim()){
            console.log( 'segungo if' );
            
            return {
                withoutSpaceToFinish:true
            };
        }else{

            console.log('else null');
            
            return null;
        }

    }

}