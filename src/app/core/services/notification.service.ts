import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Notification, Alert } from '../models/notification.model';

/**
 * خدمة الإشعارات
 * تدير جميع الإشعارات والتنبيهات في النظام
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // BehaviorSubject لتتبع عدد الإشعارات غير المقروءة
  private unreadCountSubject = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCountSubject.asObservable();

  // بيانات تجريبية للإشعارات
  private mockNotifications: Notification[] = [
    {
      id: 'n1',
      userId: '1',
      type: 'مهمة جديدة',
      title: 'مهمة ميدانية جديدة',
      message: 'تم تعيين مهمة "فحص نظام الري" لك',
      priority: 'عالية',
      isRead: false,
      relatedEntityId: 't1',
      relatedEntityType: 'task',
      actionUrl: '/field-tasks/t1',
      createdAt: new Date('2025-01-13T10:30:00'),
    },
    {
      id: 'n2',
      userId: '1',
      type: 'موعد دفع',
      title: 'موعد دفعة قادم',
      message: 'تذكير: موعد الدفعة القادمة للعقد رقم 1 في 31/03/2025',
      priority: 'متوسطة',
      isRead: false,
      relatedEntityId: '1',
      relatedEntityType: 'contract',
      actionUrl: '/contracts/1',
      createdAt: new Date('2025-01-12T14:20:00'),
    },
    {
      id: 'n3',
      userId: '1',
      type: 'تنبيه حصاد',
      title: 'موعد الحصاد اقترب',
      message: 'محصول القمح في الأرض رقم 3 جاهز للحصاد خلال أسبوعين',
      priority: 'عالية',
      isRead: true,
      relatedEntityId: '3',
      relatedEntityType: 'land',
      actionUrl: '/farmer/lands/3',
      createdAt: new Date('2025-01-11T09:15:00'),
    },
    {
      id: 'n4',
      userId: '1',
      type: 'تقرير جديد',
      title: 'تقرير مالي جديد متاح',
      message: 'تم إنشاء التقرير المالي لكتلة المنصورة الزراعية',
      priority: 'منخفضة',
      isRead: true,
      relatedEntityId: 'r1',
      relatedEntityType: 'report',
      actionUrl: '/reports',
      createdAt: new Date('2025-01-10T16:45:00'),
    },
    {
      id: 'n5',
      userId: '1',
      type: 'تحديث عقد',
      title: 'تحديث على عقد',
      message: 'تم تحديث شروط العقد رقم 2، يرجى المراجعة',
      priority: 'متوسطة',
      isRead: false,
      relatedEntityId: '2',
      relatedEntityType: 'contract',
      actionUrl: '/contracts/2',
      createdAt: new Date('2025-01-09T11:30:00'),
    },
    {
      id: 'n6',
      userId: '1',
      type: 'رسالة',
      title: 'رسالة من شركة الخير الزراعية',
      message: 'لديك رسالة جديدة من شركة الخير الزراعية بخصوص العقد',
      priority: 'منخفضة',
      isRead: true,
      createdAt: new Date('2025-01-08T13:20:00'),
    },
  ];

  // بيانات تجريبية للتنبيهات
  private mockAlerts: Alert[] = [
    {
      id: 'a1',
      type: 'SMS',
      recipient: '01012345678',
      subject: 'تذكير موعد دفع',
      content: 'عزيزي العميل، نذكركم بموعد الدفعة القادمة في 31/03/2025',
      status: 'تم الإرسال',
      sentAt: new Date('2025-01-12T14:20:00'),
      createdAt: new Date('2025-01-12T14:15:00'),
    },
    {
      id: 'a2',
      type: 'Email',
      recipient: 'ahmed@example.com',
      subject: 'تقرير مالي شهري',
      content: 'مرفق التقرير المالي لشهر ديسمبر 2024',
      status: 'تم الإرسال',
      sentAt: new Date('2025-01-10T16:50:00'),
      createdAt: new Date('2025-01-10T16:45:00'),
    },
  ];

  constructor() {
    // حساب عدد الإشعارات غير المقروءة عند التهيئة
    this.updateUnreadCount();
  }

  /**
   * الحصول على جميع الإشعارات للمستخدم
   */
  getUserNotifications(userId: string): Observable<Notification[]> {
    const notifications = this.mockNotifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return of(notifications).pipe(delay(400));
  }

  /**
   * الحصول على الإشعارات غير المقروءة
   */
  getUnreadNotifications(userId: string): Observable<Notification[]> {
    const unread = this.mockNotifications.filter(
      (n) => n.userId === userId && !n.isRead
    );
    return of(unread).pipe(delay(300));
  }

  /**
   * وضع علامة مقروء على إشعار
   */
  markAsRead(notificationId: string): Observable<boolean> {
    const notification = this.mockNotifications.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      notification.isRead = true;
      this.updateUnreadCount();
    }
    return of(true).pipe(delay(200));
  }

  /**
   * وضع علامة مقروء على جميع الإشعارات
   */
  markAllAsRead(userId: string): Observable<boolean> {
    this.mockNotifications
      .filter((n) => n.userId === userId)
      .forEach((n) => (n.isRead = true));
    this.updateUnreadCount();
    return of(true).pipe(delay(300));
  }

  /**
   * حذف إشعار
   */
  deleteNotification(notificationId: string): Observable<boolean> {
    const index = this.mockNotifications.findIndex(
      (n) => n.id === notificationId
    );
    if (index > -1) {
      this.mockNotifications.splice(index, 1);
      this.updateUnreadCount();
    }
    return of(true).pipe(delay(300));
  }

  /**
   * إنشاء إشعار جديد
   */
  createNotification(
    notification: Omit<Notification, 'id' | 'createdAt'>
  ): Observable<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: 'n' + (this.mockNotifications.length + 1),
      createdAt: new Date(),
    };
    this.mockNotifications.unshift(newNotification);
    this.updateUnreadCount();
    return of(newNotification).pipe(delay(300));
  }

  /**
   * الحصول على التنبيهات
   */
  getAlerts(): Observable<Alert[]> {
    return of(this.mockAlerts).pipe(delay(400));
  }

  /**
   * إرسال تنبيه
   */
  sendAlert(
    alert: Omit<Alert, 'id' | 'status' | 'sentAt' | 'createdAt'>
  ): Observable<Alert> {
    const newAlert: Alert = {
      ...alert,
      id: 'a' + (this.mockAlerts.length + 1),
      status: 'تم الإرسال',
      sentAt: new Date(),
      createdAt: new Date(),
    };
    this.mockAlerts.unshift(newAlert);
    return of(newAlert).pipe(delay(1000));
  }

  /**
   * تحديث عدد الإشعارات غير المقروءة
   */
  private updateUnreadCount(): void {
    const unreadCount = this.mockNotifications.filter((n) => !n.isRead).length;
    this.unreadCountSubject.next(unreadCount);
  }
}
