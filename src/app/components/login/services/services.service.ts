import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { BodyRequest } from '../interfaces/bodyRequest'; 
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http : HttpClient
  ) { }

  postLogin( bodyRequest: BodyRequest ){


    return this.http.post( `${ environment.urlSrv }/login`, bodyRequest )
  }
}
