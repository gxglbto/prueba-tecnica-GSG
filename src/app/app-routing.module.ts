import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConversionsComponent } from './components/private/conversions/conversions.component';
import { FormComponent } from './components/private/form/form.component';
import { CalculateDateComponent } from './components/private/calculate-date/calculate-date.component';
import { WelcomeComponent } from './components/private/welcome/welcome.component';
import { AuthGuard } from './core/guards/auth.guard'; 
import { NotFoundComponent } from './components/private/not-found/not-found.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'notFound', component: NotFoundComponent},
  {
    path:"",
    loadChildren:() => import ('./components/private/auth/auth.module').then( m => m.AuthModule),
     canActivate:[AuthGuard]
  },
    
  
  { path:'**', pathMatch:'full', redirectTo:'notFound', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
