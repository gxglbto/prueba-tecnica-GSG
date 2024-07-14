import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ){}
  

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const ISLOGIN : boolean | any = localStorage.getItem("login");
    
    if( ISLOGIN == "true"){

      return true
    }
    
    return false;
  }

  // isLoggin(){


  //   return true;
  // }
  
}

