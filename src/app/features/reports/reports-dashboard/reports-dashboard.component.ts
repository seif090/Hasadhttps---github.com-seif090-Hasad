import { Component } from '@angular/core';

/**
 * لوحة التقارير
 */
@Component({
  selector: 'app-reports-dashboard',
  template: `
    <div class="flex min-h-screen bg-gray-50">
      <app-sidebar></app-sidebar>
      <div class="flex-1 mr-64">
        <app-topbar></app-topbar>
        <main class="p-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            التقارير والتحليلات 📊
          </h1>
          <div class="card">
            <p class="text-gray-600">التقارير والتحليلات - قيد التطوير</p>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class ReportsDashboardComponent {}
