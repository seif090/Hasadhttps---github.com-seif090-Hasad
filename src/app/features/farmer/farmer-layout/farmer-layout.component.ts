import { Component } from '@angular/core';

/**
 * تخطيط صفحات المزارع
 * يحتوي على Sidebar و Topbar
 */
@Component({
  selector: 'app-farmer-layout',
  template: `
    <div class="flex min-h-screen bg-gray-50">
      <!-- Sidebar -->
      <app-sidebar></app-sidebar>

      <!-- المحتوى الرئيسي -->
      <div class="flex-1 mr-64">
        <!-- Topbar -->
        <app-topbar></app-topbar>

        <!-- محتوى الصفحة -->
        <main class="p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class FarmerLayoutComponent {}
