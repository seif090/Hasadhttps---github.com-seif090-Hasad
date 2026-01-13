import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CustomPreloadingStrategy } from './core/strategies/preload-strategy';

/**
 * المسارات الرئيسية للتطبيق
 * - المسار الافتراضي يوجه إلى صفحة تسجيل الدخول
 * - جميع المسارات الأخرى محمية بواسطة AuthGuard
 * - استخدام استراتيجية التحميل المسبق المخصصة
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
    data: { preload: false },
  },
  {
    path: 'farmer',
    loadChildren: () =>
      import('./features/farmer/farmer.module').then((m) => m.FarmerModule),
    canActivate: [AuthGuard],
    data: { preload: true, delay: 1000 },
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./features/company/company.module').then((m) => m.CompanyModule),
    canActivate: [AuthGuard],
    data: { preload: true, delay: 2000 },
  },
  {
    path: 'field-tasks',
    loadChildren: () =>
      import('./features/field-tasks/field-tasks.module').then(
        (m) => m.FieldTasksModule
      ),
    canActivate: [AuthGuard],
    data: { preload: true, delay: 3000 },
  },
  {
    path: 'contracts',
    loadChildren: () =>
      import('./features/contracts/contracts.module').then(
        (m) => m.ContractsModule
      ),
    canActivate: [AuthGuard],
    data: { preload: true, delay: 4000 },
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./features/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthGuard],
    data: { preload: true, delay: 5000 },
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./features/notifications/notifications.module').then(
        (m) => m.NotificationsModule
      ),
    canActivate: [AuthGuard],
    data: { preload: true, delay: 6000 },
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      enableTracing: false, // تشغيل في وضع التطوير فقط للتتبع
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
