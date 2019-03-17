import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { FormsModule } from './forms/forms.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'forms', pathMatch: 'full'},
      { path: 'forms', loadChildren: () => FormsModule },
      // { path: 'survey', loadChildren: () => SurveyModule }
    ],
    // canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
