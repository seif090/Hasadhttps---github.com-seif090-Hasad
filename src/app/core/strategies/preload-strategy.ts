import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * Custom Preloading Strategy
 * استراتيجية تحميل مسبق مخصصة للوحدات
 * تحمل الوحدات المهمة فوراً والباقي بعد تأخير
 */
@Injectable({
  providedIn: 'root',
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // إذا كانت الوحدة معلمة بـ preload: true
    if (route.data && route.data['preload']) {
      const delay = route.data['delay'] || 0;

      // تحميل الوحدة بعد التأخير المحدد
      return timer(delay).pipe(
        mergeMap(() => {
          console.log(`Preloading module: ${route.path}`);
          return load();
        })
      );
    }

    // عدم التحميل المسبق
    return of(null);
  }
}
