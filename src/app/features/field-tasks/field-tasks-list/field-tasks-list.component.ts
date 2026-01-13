import { Component } from '@angular/core';

/**
 * قائمة المهام الميدانية
 */
@Component({
  selector: 'app-field-tasks-list',
  template: `
    <div class="flex min-h-screen bg-gray-50">
      <app-sidebar></app-sidebar>
      <div class="flex-1 mr-64">
        <app-topbar></app-topbar>
        <main class="p-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            المهام الميدانية ✅
          </h1>
          <div class="card">
            <p class="text-gray-600">إدارة المهام الميدانية - قيد التطوير</p>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class FieldTasksListComponent {}
