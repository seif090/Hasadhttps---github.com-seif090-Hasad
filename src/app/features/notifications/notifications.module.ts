import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NotificationsRoutingModule } from './notifications-routing.module';

/**
 * وحدة الإشعارات
 */
@NgModule({
  declarations: [],
  imports: [SharedModule, NotificationsRoutingModule],
})
export class NotificationsModule {}
