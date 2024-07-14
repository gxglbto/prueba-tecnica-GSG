import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,


    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule, //para fechas,
    MatNativeDateModule, //para fechas
    MatSelectModule,
    MatIconModule
  ]
})
export class MaterialModuleModule { }
