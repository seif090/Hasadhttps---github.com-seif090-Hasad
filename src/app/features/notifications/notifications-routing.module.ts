import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { NotificationsCenterComponent } from './notifications-center/notifications-center.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsListComponent,
  },
  {
    path: 'center',
    component: NotificationsCenterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
