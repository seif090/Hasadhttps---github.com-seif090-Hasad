import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

/**
 * Error Interceptor
 * معالج عام لأخطاء HTTP
 * يعرض رسائل خطأ واضحة للمستخدم
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // إعادة المحاولة مرة واحدة في حالة فشل الطلب
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // خطأ من جانب العميل
          errorMessage = `خطأ: ${error.error.message}`;
        } else {
          // خطأ من جانب السيرفر
          switch (error.status) {
            case 0:
              errorMessage =
                'لا يوجد اتصال بالإنترنت. تحقق من اتصالك وحاول مرة أخرى.';
              break;
            case 400:
              errorMessage =
                error.error?.message || 'البيانات المدخلة غير صحيحة';
              break;
            case 401:
              errorMessage = 'الرجاء تسجيل الدخول للمتابعة';
              break;
            case 403:
              errorMessage = 'ليس لديك صلاحية للوصول لهذا المورد';
              break;
            case 404:
              errorMessage = 'المورد المطلوب غير موجود';
              break;
            case 500:
              errorMessage = 'خطأ في السيرفر. حاول مرة أخرى لاحقاً';
              break;
            case 503:
              errorMessage = 'الخدمة غير متاحة حالياً. حاول لاحقاً';
              break;
            default:
              errorMessage =
                error.error?.message || `خطأ غير متوقع: ${error.status}`;
          }
        }

        // عرض رسالة الخطأ للمستخدم
        this.toastService.error(errorMessage);

        // تسجيل الخطأ في Console للتطوير
        console.error('HTTP Error:', {
          status: error.status,
          message: errorMessage,
          url: error.url,
          error: error.error,
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
