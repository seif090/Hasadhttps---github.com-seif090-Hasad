import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsCenterComponent } from './notifications-center/notifications-center.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';

/**
 * وحدة الإشعارات
 */
@NgModule({
  declarations: [NotificationsCenterComponent, NotificationsListComponent],
  imports: [SharedModule, NotificationsRoutingModule],
})
export class NotificationsModule {}
