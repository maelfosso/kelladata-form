import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { DefaultFormComponent } from './default-form/default-form.component';
import { FillingFormComponent } from './filling-form/filling-form.component';

@NgModule({
  declarations: [FormsComponent, DefaultFormComponent, FillingFormComponent],
  imports: [
    CommonModule,
    AngularFormsModule, ReactiveFormsModule,
    HttpClientModule,

    FormsRoutingModule,

    SharedModule,
  ]
})
export class FormsModule { }
