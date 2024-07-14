import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http : HttpClient
  ) { }

  getCatalogoEstadoCivil(){

    const requestBody = {

    }

    return this.http.post(`${ environment.urlSrvCatalogo }/BienesRaicesApi/api/services/app/Catalogo/EstadoCivil`,requestBody)
  }
}
