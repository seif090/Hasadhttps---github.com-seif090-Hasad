import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { User } from '../../../core/models/user.model';

/**
 * مكون الشريط العلوي
 * يحتوي على معلومات المستخدم والإشعارات
 */
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  currentUser: User | null = null;
  unreadCount = 0;
  showNotificationsDropdown = false;
  showProfileDropdown = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    // الاشتراك في عدد الإشعارات غير المقروءة
    this.notificationService.unreadCount$.subscribe((count) => {
      this.unreadCount = count;
    });
  }

  /**
   * التبديل بين إظهار/إخفاء قائمة الإشعارات
   */
  toggleNotifications(): void {
    this.showNotificationsDropdown = !this.showNotificationsDropdown;
    this.showProfileDropdown = false;
  }

  /**
   * التبديل بين إظهار/إخفاء قائمة الملف الشخصي
   */
  toggleProfile(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
    this.showNotificationsDropdown = false;
  }

  /**
   * الانتقال إلى صفحة الإشعارات
   */
  goToNotifications(): void {
    this.router.navigate(['/notifications']);
    this.showNotificationsDropdown = false;
  }

  /**
   * تسجيل الخروج
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  /**
   * الحصول على التاريخ الحالي
   */
  getCurrentDate(): string {
    const days = [
      'الأحد',
      'الإثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ];
    const months = [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ];
    const now = new Date();
    return `${days[now.getDay()]}، ${now.getDate()} ${
      months[now.getMonth()]
    } ${now.getFullYear()}`;
  }
}
