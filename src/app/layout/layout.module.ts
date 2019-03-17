import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { LayoutRoutingModule } from './layout-routing.module';
import { FormsModule } from './forms/forms.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    AngularFormsModule, ReactiveFormsModule,
    LayoutRoutingModule,

    SharedModule,

    FormsModule
  ]
})
export class LayoutModule { }
