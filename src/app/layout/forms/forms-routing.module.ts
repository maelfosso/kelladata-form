import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { DefaultFormComponent } from './default-form/default-form.component';
import { FillingFormComponent } from './filling-form/filling-form.component';
import { ListFormsComponent } from './list-forms/list-forms.component';
import { StatsComponent } from './stats/stats.component';
import { DataComponent } from './data/data.component';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      { path: '', component: ListFormsComponent },
      { path: 'default/:id', component: DefaultFormComponent },
      { path: 'default', component: DefaultFormComponent },
      { path: 'data/default', component: DataComponent },
      { path: ':survey', component: FillingFormComponent },
      { path: ':survey/stats', component: StatsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
