import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Loading Service
 * خدمة مشتركة لإدارة حالة التحميل في التطبيق
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * إظهار مؤشر التحميل
   */
  show(): void {
    this.loadingSubject.next(true);
  }

  /**
   * إخفاء مؤشر التحميل
   */
  hide(): void {
    this.loadingSubject.next(false);
  }

  /**
   * الحصول على حالة التحميل الحالية
   */
  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
