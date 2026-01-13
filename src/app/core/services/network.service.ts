import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Network Service
 * خدمة للكشف عن حالة الاتصال بالإنترنت
 */
@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  public online$: Observable<boolean> = this.onlineSubject.asObservable();

  constructor() {
    this.initNetworkMonitoring();
  }

  /**
   * تهيئة مراقبة حالة الشبكة
   */
  private initNetworkMonitoring(): void {
    merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).subscribe((isOnline) => {
      console.log(isOnline ? '🌐 متصل بالإنترنت' : '📡 غير متصل بالإنترنت');
      this.onlineSubject.next(isOnline);
    });
  }

  /**
   * التحقق من الاتصال بالإنترنت
   */
  isOnline(): boolean {
    return this.onlineSubject.value;
  }

  /**
   * التحقق من عدم الاتصال بالإنترنت
   */
  isOffline(): boolean {
    return !this.isOnline();
  }

  /**
   * الانتظار حتى يتوفر الاتصال
   */
  waitForConnection(): Observable<boolean> {
    if (this.isOnline()) {
      return new Observable((observer) => {
        observer.next(true);
        observer.complete();
      });
    }

    return this.online$.pipe(
      map((isOnline) => {
        if (isOnline) {
          return true;
        }
        throw new Error('لا يوجد اتصال بالإنترنت');
      })
    );
  }
}
