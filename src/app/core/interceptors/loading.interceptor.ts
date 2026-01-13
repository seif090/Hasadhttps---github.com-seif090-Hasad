import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/**
 * Loading Interceptor
 * يعرض ويخفي مؤشر التحميل تلقائياً مع كل طلب HTTP
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // تجاهل الطلبات التي تحتوي على header معين
    if (request.headers.has('X-Skip-Loading')) {
      const newRequest = request.clone({
        headers: request.headers.delete('X-Skip-Loading'),
      });
      return next.handle(newRequest);
    }

    // زيادة عدد الطلبات النشطة
    this.totalRequests++;
    this.loadingService.show();

    return next.handle(request).pipe(
      finalize(() => {
        // تقليل عدد الطلبات النشطة
        this.totalRequests--;

        // إخفاء المؤشر عندما تنتهي جميع الطلبات
        if (this.totalRequests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
