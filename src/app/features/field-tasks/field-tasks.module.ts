import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FieldTasksRoutingModule } from './field-tasks-routing.module';

/**
 * وحدة المهام الميدانية
 */
@NgModule({
  declarations: [],
  imports: [SharedModule, FieldTasksRoutingModule],
})
export class FieldTasksModule {}
