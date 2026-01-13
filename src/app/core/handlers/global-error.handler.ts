import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { AnalyticsService } from '../services/analytics.service';

/**
 * Global Error Handler
 * معالج عام لجميع الأخطاء في التطبيق
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse): void {
    const toastService = this.injector.get(ToastService);
    const analyticsService = this.injector.get(AnalyticsService);

    let errorMessage = '';
    let errorType = '';

    if (error instanceof HttpErrorResponse) {
      // خطأ HTTP
      errorType = 'HTTP Error';
      errorMessage = `خطأ في الاتصال بالسيرفر: ${error.status}`;
      console.error('HTTP Error:', error);
    } else {
      // خطأ من جانب العميل
      errorType = 'Client Error';
      errorMessage = error.message || 'حدث خطأ غير متوقع';
      console.error('Client Error:', error);
    }

    // تتبع الخطأ
    analyticsService.trackError(error, errorType);

    // عرض رسالة للمستخدم (في بعض الحالات فقط)
    if (this.shouldShowToUser(error)) {
      toastService.error(errorMessage);
    }

    // تسجيل الخطأ (يمكن إرساله لخدمة مراقبة مثل Sentry)
    this.logErrorToService(error, errorType);
  }

  /**
   * التحقق من ضرورة عرض الخطأ للمستخدم
   */
  private shouldShowToUser(error: Error | HttpErrorResponse): boolean {
    // لا تعرض أخطاء معينة للمستخدم
    if (error instanceof HttpErrorResponse) {
      // تجاهل 401 لأنه يتم التعامل معه في AuthInterceptor
      if (error.status === 401) return false;
    }

    return true;
  }

  /**
   * تسجيل الخطأ في خدمة خارجية
   */
  private logErrorToService(
    error: Error | HttpErrorResponse,
    type: string
  ): void {
    // يمكن إرسال الخطأ إلى Sentry أو LogRocket أو أي خدمة مراقبة
    const errorLog = {
      type,
      message: error.message,
      stack: error instanceof Error ? error.stack : null,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    console.log('📝 Error logged:', errorLog);

    // TODO: إرسال إلى خدمة مراقبة
    // this.errorLoggingService.logError(errorLog);
  }
}
