import { Component } from '@angular/core';

/**
 * لوحة تحكم الشركات
 * تعرض الكتل الزراعية والتقارير المالية
 */
@Component({
  selector: 'app-company-dashboard',
  template: `
    <div class="flex min-h-screen bg-gray-50">
      <app-sidebar></app-sidebar>
      <div class="flex-1 mr-64">
        <app-topbar></app-topbar>
        <main class="p-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            لوحة تحكم الشركة 🏢
          </h1>
          <div class="card">
            <p class="text-gray-600">
              مرحباً في لوحة تحكم الشركة - قيد التطوير
            </p>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class CompanyDashboardComponent {}
