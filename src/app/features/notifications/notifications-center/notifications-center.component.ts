import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model';
import { ToastService } from '../../../core/services/toast.service';

/**
 * مركز الإشعارات
 */
@Component({
  selector: 'app-notifications-center',
  templateUrl: './notifications-center.component.html',
  styleUrls: ['./notifications-center.component.scss'],
})
export class NotificationsCenterComponent implements OnInit {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  loading = false;

  // Filters
  selectedType = '';
  showUnreadOnly = false;

  // Stats
  stats = {
    total: 0,
    unread: 0,
    info: 0,
    warning: 0,
    success: 0,
    error: 0
  };

  constructor(
    private notificationService: NotificationService,
    private toastService: ToastService
  ) {}

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
        this.notifications = notifications;
        this.filteredNotifications = notifications;
        this.calculateStats(notifications);
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.toastService.error('فشل تحميل الإشعارات');
        this.loading = false;
      }
    });
  }

  /**
   * حساب الإحصائيات
   */
  calculateStats(notifications: Notification[]): void {
    this.stats.total = notifications.length;
    this.stats.unread = notifications.filter(n => !n.isRead).length;
    this.stats.info = notifications.filter(n => n.type === 'info').length;
    this.stats.warning = notifications.filter(n => n.type === 'warning').length;
    this.stats.success = notifications.filter(n => n.type === 'success').length;
    this.stats.error = notifications.filter(n => n.type === 'error').length;
  }

  /**
   * تطبيق الفلاتر
   */
  applyFilters(): void {
    this.filteredNotifications = this.notifications.filter(notification => {
      const matchesType = !this.selectedType || notification.type === this.selectedType;
      const matchesReadStatus = !this.showUnreadOnly || !notification.isRead;

      return matchesType && matchesReadStatus;
    });
  }

  /**
   * مسح الفلاتر
   */
  clearFilters(): void {
    this.selectedType = '';
    this.showUnreadOnly = false;
    this.applyFilters();
  }

  /**
   * تحديد إشعار كمقروء
   */
  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.isRead = true;
          this.calculateStats(this.notifications);
          this.applyFilters();
        }
        this.toastService.success('تم تحديد الإشعار كمقروء');
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
        this.toastService.error('فشل تحديد الإشعار كمقروء');
      }
    });
  }

  /**
   * تحديد جميع الإشعارات كمقروءة
   */
  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.forEach(n => n.isRead = true);
        this.calculateStats(this.notifications);
        this.applyFilters();
        this.toastService.success('تم تحديد جميع الإشعارات كمقروءة');
      },
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
        this.toastService.error('فشل تحديد الإشعارات كمقروءة');
      }
    });
  }

  /**
   * الحصول على أيقونة النوع
   */
  getTypeIcon(type: string): string {
    switch (type) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '📢';
    }
  }

  /**
   * الحصول على لون النوع
   */
  getTypeColor(type: string): 'info' | 'warning' | 'success' | 'danger' {
    switch (type) {
      case 'info': return 'info';
      case 'warning': return 'warning';
      case 'success': return 'success';
      case 'error': return 'danger';
      default: return 'info';
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
