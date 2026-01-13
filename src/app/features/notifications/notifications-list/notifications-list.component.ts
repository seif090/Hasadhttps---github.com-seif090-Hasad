import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model';
import { SharedModule } from '@shared/shared.module';

/**
 * قائمة الإشعارات
 */
@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit {
  notifications: Notification[] = [];
  loading = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  /**
   * تحميل الإشعارات
   */
  loadNotifications(): void {
    this.loading = true;

    this.notificationService.notifications$.subscribe({
      next: (notifications) => {
        // Show only latest 5 notifications
        this.notifications = notifications.slice(0, 5);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.loading = false;
      },
    });
  }

  /**
   * تحديد إشعار كمقروء
   */
  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId).subscribe();
  }

  /**
   * الحصول على أيقونة النوع
   */
  getTypeIcon(type: string): string {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '📢';
    }
  }

  /**
   * الحصول على الوقت النسبي
   */
  getRelativeTime(date: Date): string {
    const now = Date.now();
    const notificationTime = new Date(date).getTime();
    const diff = now - notificationTime;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  }
}
