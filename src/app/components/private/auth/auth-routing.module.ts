import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ConversionsComponent } from '../conversions/conversions.component';
import { CalculateDateComponent } from '../calculate-date/calculate-date.component';
import { FormComponent } from '../form/form.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { path :'bienvenido', component: WelcomeComponent},
      { path :'conversiones', component: ConversionsComponent},
      { path:'calcular-fecha', component: CalculateDateComponent, },
      { path:'formulario', component: FormComponent,},
      { path :'', redirectTo:'bienvenido'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
