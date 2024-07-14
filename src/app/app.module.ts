import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './material-module/material-module.module';

// forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// servicios htttp
import { HttpClientModule } from "@angular/common/http";
import { ModalComponent } from './components/shared/modal/modal.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { ConversionsComponent } from './components/private/conversions/conversions.component';
import { WelcomeComponent } from './components/private/welcome/welcome.component';
import { CalculateDateComponent } from './components/private/calculate-date/calculate-date.component';
import { FormComponent } from './components/private/form/form.component';
import { CambioLetrasPipe } from './components/private/welcome/pipes/cambio-letras.pipe';
import { NavbarComponent } from './components/private/navbar/navbar.component';
import { NotFoundComponent } from './components/private/not-found/not-found.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalComponent,
    SpinnerComponent,
    ConversionsComponent,
    WelcomeComponent,
    CalculateDateComponent,
    FormComponent,
    CambioLetrasPipe,
    NavbarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
