import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

/**
 * Global Loading Component
 * مؤشر تحميل عام يظهر في وسط الشاشة
 */
@Component({
  selector: 'app-global-loader',
  template: `
    <div
      *ngIf="isLoading$ | async"
      class="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center"
    >
      <div
        class="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-2xl"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"
        ></div>
        <p class="text-gray-700 font-medium">جاري التحميل...</p>
      </div>
    </div>
  `,
  styles: [],
})
export class GlobalLoaderComponent implements OnInit {
  isLoading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {}
}
