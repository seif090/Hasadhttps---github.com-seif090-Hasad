import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FieldTasksRoutingModule } from './field-tasks-routing.module';
import { FieldTasksListComponent } from './field-tasks-list/field-tasks-list.component';

/**
 * وحدة المهام الميدانية
 */
@NgModule({
  declarations: [FieldTasksListComponent],
  imports: [SharedModule, FieldTasksRoutingModule],
})
export class FieldTasksModule {}
