import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldTasksListComponent } from './field-tasks-list/field-tasks-list.component';

const routes: Routes = [
  {
    path: '',
    component: FieldTasksListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldTasksRoutingModule {}
