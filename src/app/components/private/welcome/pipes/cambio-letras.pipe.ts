import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cambioLetras'
})
export class CambioLetrasPipe implements PipeTransform {

  transform(value: string): string {
    // return null;
    // value.toLowerCase();

    let phrase = value.toLowerCase().split('');

    phrase.forEach(( letter:string, index:number) => {
      switch( letter ){
        case 'a': phrase[index] = '4'; break; 
        case 'e': phrase[index] = '3'; break;
        case 'i': phrase[index] = '1'; break;
        case 'o': phrase[index] = '0'; break;
        case 'u': phrase[index] = '9'; break;
      }
    });


    console.log( phrase );
    

    return phrase.join("")
  }

}
