import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { DefaultFormComponent } from './default-form/default-form.component';
import { FillingFormComponent } from './filling-form/filling-form.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', component: FormsComponent },
  { path: 'default', component: DefaultFormComponent },
  { path: ':survey', component: FillingFormComponent },
  { path: ':survey/stats', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
