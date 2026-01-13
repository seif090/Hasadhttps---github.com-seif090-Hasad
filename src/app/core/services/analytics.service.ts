import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Analytics {
  pageView: string;
  timestamp: Date;
  userId?: string;
  userRole?: string;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  renderTime: number;
}

/**
 * Analytics Service
 * خدمة لتتبع الإحصائيات والتحليلات في التطبيق
 */
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private analyticsSubject = new BehaviorSubject<Analytics[]>([]);
  public analytics$ = this.analyticsSubject.asObservable();

  private performanceSubject = new BehaviorSubject<PerformanceMetrics | null>(
    null
  );
  public performance$ = this.performanceSubject.asObservable();

  /**
   * تتبع زيارة الصفحة
   */
  trackPageView(pageName: string, userId?: string, userRole?: string): void {
    const analytics: Analytics = {
      pageView: pageName,
      timestamp: new Date(),
      userId,
      userRole,
    };

    const current = this.analyticsSubject.value;
    this.analyticsSubject.next([...current, analytics]);

    console.log(`📊 Page View: ${pageName}`, analytics);
  }

  /**
   * تتبع حدث
   */
  trackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number
  ): void {
    console.log(`📊 Event: ${category} - ${action}`, { label, value });
  }

  /**
   * تتبع خطأ
   */
  trackError(error: Error, context?: string): void {
    console.error(`❌ Error tracked: ${error.message}`, { error, context });
  }

  /**
   * تتبع أداء الصفحة
   */
  trackPerformance(metrics: PerformanceMetrics): void {
    this.performanceSubject.next(metrics);
    console.log('⚡ Performance Metrics:', metrics);
  }

  /**
   * الحصول على إحصائيات الصفحات الأكثر زيارة
   */
  getMostVisitedPages(): Observable<{ page: string; count: number }[]> {
    return this.analytics$.pipe(
      map((analytics) => {
        const pageCounts: Record<string, number> = {};

        analytics.forEach((item) => {
          pageCounts[item.pageView] = (pageCounts[item.pageView] || 0) + 1;
        });

        return Object.entries(pageCounts)
          .map(([page, count]) => ({ page, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);
      })
    );
  }

  /**
   * حساب متوسط وقت التحميل
   */
  getAverageLoadTime(): number {
    const perf = this.performanceSubject.value;
    if (!perf) return 0;

    return (perf.pageLoadTime + perf.apiResponseTime + perf.renderTime) / 3;
  }

  /**
   * مسح الإحصائيات
   */
  clearAnalytics(): void {
    this.analyticsSubject.next([]);
  }
}
