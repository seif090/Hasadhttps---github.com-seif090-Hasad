import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Auth Interceptor
 * يضيف JWT Token تلقائياً لكل طلب HTTP
 * يتعامل مع أخطاء 401 Unauthorized
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // الحصول على التوكن
    const token = localStorage.getItem('hasad_token');

    // إضافة التوكن للطلب إذا كان موجوداً
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
        },
      });
    }

    // معالجة الطلب
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // في حالة 401 Unauthorized - تسجيل الخروج والذهاب للـ Login
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: this.router.url },
          });
        }

        // في حالة 403 Forbidden
        if (error.status === 403) {
          console.error('Access Denied: ليس لديك صلاحية للوصول لهذا المورد');
        }

        return throwError(() => error);
      })
    );
  }
}
