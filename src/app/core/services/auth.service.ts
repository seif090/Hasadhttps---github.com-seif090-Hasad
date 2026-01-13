import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '../models/user.model';

/**
 * خدمة المصادقة والتسجيل
 * تدير عمليات تسجيل الدخول والخروج وحالة المستخدم
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // التحقق من وجود مستخدم مسجل في localStorage
    this.loadUserFromStorage();
  }

  /**
   * تسجيل الدخول
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // محاكاة استدعاء API
    const mockUser: User = {
      id: '1',
      name: 'أحمد محمد',
      email: credentials.email,
      phone: '01012345678',
      role: credentials.email.includes('company') ? 'company' : 'farmer',
      avatar: 'assets/images/avatar-placeholder.png',
      createdAt: new Date(),
    };

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };

    return of(mockResponse).pipe(
      delay(1000),
      tap((response) => {
        this.setCurrentUser(response.user);
        this.saveTokens(response.token, response.refreshToken);
      })
    );
  }

  /**
   * التسجيل الجديد
   */
  register(data: RegisterData): Observable<AuthResponse> {
    // محاكاة استدعاء API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      createdAt: new Date(),
    };

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };

    return of(mockResponse).pipe(
      delay(1000),
      tap((response) => {
        this.setCurrentUser(response.user);
        this.saveTokens(response.token, response.refreshToken);
      })
    );
  }

  /**
   * تسجيل الخروج
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * الحصول على المستخدم الحالي
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * التحقق من حالة المصادقة
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * الحصول على التوكن
   */
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * حفظ المستخدم الحالي
   */
  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * حفظ التوكنات
   */
  private saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  /**
   * تحميل المستخدم من localStorage
   */
  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (e) {
        console.error('خطأ في تحميل بيانات المستخدم', e);
      }
    }
  }
}
