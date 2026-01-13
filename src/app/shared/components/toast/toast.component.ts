import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from '../../../core/services/toast.service';
import { trigger, transition, style, animate } from '@angular/animations';

/**
 * Toast Component
 * عرض رسائل Toast في الشاشة
 */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  /**
   * إزالة Toast
   */
  removeToast(id: string): void {
    this.toastService.remove(id);
  }

  /**
   * الحصول على أيقونة Toast حسب النوع
   */
  getIcon(type: Toast['type']): string {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[type];
  }

  /**
   * الحصول على لون Toast حسب النوع
   */
  getColorClass(type: Toast['type']): string {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
    };
    return colors[type];
  }
}
