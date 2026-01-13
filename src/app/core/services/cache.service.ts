import { Injectable } from '@angular/core';

export interface CacheConfig {
  maxAge?: number; // بالميلي ثانية
  maxSize?: number; // عدد العناصر
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * Cache Service
 * خدمة للتخزين المؤقت في الذاكرة
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultMaxAge = 5 * 60 * 1000; // 5 دقائق
  private defaultMaxSize = 50; // 50 عنصر

  /**
   * حفظ البيانات في الكاش
   */
  set<T>(key: string, data: T, config?: CacheConfig): void {
    // تنظيف الكاش إذا تجاوز الحد الأقصى
    if (this.cache.size >= (config?.maxSize || this.defaultMaxSize)) {
      this.clearOldest();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * استرجاع البيانات من الكاش
   */
  get<T>(key: string, config?: CacheConfig): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const maxAge = config?.maxAge || this.defaultMaxAge;
    const age = Date.now() - entry.timestamp;

    // التحقق من انتهاء صلاحية الكاش
    if (age > maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * التحقق من وجود بيانات في الكاش
   */
  has(key: string, config?: CacheConfig): boolean {
    return this.get(key, config) !== null;
  }

  /**
   * حذف بيانات من الكاش
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * مسح كل الكاش
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * مسح الكاش المنتهي الصلاحية
   */
  clearExpired(maxAge: number = this.defaultMaxAge): void {
    const now = Date.now();

    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > maxAge) {
        this.cache.delete(key);
      }
    });
  }

  /**
   * حذف أقدم عنصر
   */
  private clearOldest(): void {
    let oldestKey: string | null = null;
    let oldestTimestamp = Infinity;

    this.cache.forEach((entry, key) => {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * الحصول على حجم الكاش
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * الحصول على جميع المفاتيح
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * دالة مساعدة للكاش مع الطلبات
   */
  async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    config?: CacheConfig
  ): Promise<T> {
    // محاولة استرجاع من الكاش
    const cached = this.get<T>(key, config);

    if (cached !== null) {
      console.log(`✅ Cache hit: ${key}`);
      return cached;
    }

    // إذا لم يوجد، جلب البيانات
    console.log(`❌ Cache miss: ${key}`);
    const data = await fetchFn();

    // حفظ في الكاش
    this.set(key, data, config);

    return data;
  }
}
