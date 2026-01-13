import { Component, HostListener, OnInit } from '@angular/core';
import { NetworkService } from '../../../core/services/network.service';

/**
 * Network Status Component
 * عرض حالة الاتصال بالإنترنت
 */
@Component({
  selector: 'app-network-status',
  template: `
    <div 
      *ngIf="!isOnline"
      class="fixed bottom-0 left-0 right-0 bg-red-500 text-white px-4 py-3 shadow-lg z-50 animate-slideUp"
    >
      <div class="container mx-auto flex items-center justify-center gap-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path>
        </svg>
        <p class="font-medium">لا يوجد اتصال بالإنترنت. يرجى التحقق من اتصالك.</p>
      </div>
    </div>

    <div 
      *ngIf="wasOffline && isOnline"
      class="fixed bottom-0 left-0 right-0 bg-green-500 text-white px-4 py-3 shadow-lg z-50 animate-slideUp"
    >
      <div class="container mx-auto flex items-center justify-center gap-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="font-medium">تم استعادة الاتصال بالإنترنت</p>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .animate-slideUp {
      animation: slideUp 0.3s ease-out;
    }
  `]
})
export class NetworkStatusComponent implements OnInit {
  isOnline = true;
  wasOffline = false;

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {
    this.networkService.online$.subscribe(isOnline => {
      if (!isOnline) {
        this.wasOffline = true;
      }
      
      this.isOnline = isOnline;

      // إخفاء رسالة "تم استعادة الاتصال" بعد 3 ثوان
      if (isOnline && this.wasOffline) {
        setTimeout(() => {
          this.wasOffline = false;
        }, 3000);
      }
    });
  }
}
