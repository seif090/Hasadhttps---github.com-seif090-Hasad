import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

/**
 * مكون الشريط الجانبي
 * يحتوي على القائمة الرئيسية للتنقل في التطبيق
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentUser: User | null = null;
  isCollapsed = false;

  // قائمة العناصر للمزارع
  farmerMenuItems = [
    { icon: '🏠', label: 'لوحة التحكم', route: '/farmer/dashboard' },
    { icon: '🌾', label: 'أراضيي', route: '/farmer/lands' },
    { icon: '📄', label: 'عقودي', route: '/contracts' },
    { icon: '📊', label: 'التقارير', route: '/reports' },
    { icon: '🔔', label: 'الإشعارات', route: '/notifications' },
  ];

  // قائمة العناصر للشركة
  companyMenuItems = [
    { icon: '🏢', label: 'لوحة التحكم', route: '/company/dashboard' },
    { icon: '🗺️', label: 'الكتل الزراعية', route: '/company/blocks' },
    { icon: '✅', label: 'المهام الميدانية', route: '/field-tasks' },
    { icon: '📄', label: 'العقود', route: '/contracts' },
    { icon: '📈', label: 'التقارير المالية', route: '/reports' },
    { icon: '🔔', label: 'الإشعارات', route: '/notifications' },
  ];

  menuItems: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // الحصول على بيانات المستخدم الحالي
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        // اختيار القائمة حسب دور المستخدم
        this.menuItems =
          user.role === 'farmer' ? this.farmerMenuItems : this.companyMenuItems;
      }
    });
  }

  /**
   * طي/فتح الشريط الجانبي
   */
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /**
   * تسجيل الخروج
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  /**
   * التحقق من تفعيل الرابط
   */
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
