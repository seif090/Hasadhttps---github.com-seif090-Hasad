# 🔌 دليل ربط المشروع بالـ Backend

## 📋 نظرة عامة

هذا الدليل يشرح كيفية ربط منصة Hasad بـ Backend حقيقي بدلاً من البيانات الوهمية.

---

## 🎯 الخطوات الرئيسية

### 1️⃣ إعداد عنوان API الأساسي

أنشئ ملف `environment.ts` إذا لم يكن موجوداً:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: "https://api.hasad.com/api", // عنوان API الخاص بك
  apiVersion: "v1",
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: "https://api.hasad.com/api",
  apiVersion: "v1",
};
```

---

## 🔧 تحديث الخدمات

### Auth Service

**قبل (البيانات الوهمية):**

```typescript
login(email: string, password: string): Observable<any> {
  const mockResponse = {
    user: { id: '1', name: 'أحمد محمد', email, role: 'farmer' },
    token: 'mock-jwt-token-12345'
  };
  return of(mockResponse).pipe(delay(1000));
}
```

**بعد (API حقيقي):**

```typescript
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

login(email: string, password: string): Observable<any> {
  return this.http.post(`${environment.apiUrl}/auth/login`, {
    email,
    password
  });
}

register(userData: any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/auth/register`, userData);
}
```

---

### Farmer Service

**قبل:**

```typescript
getFarmerLands(farmerId: string): Observable<Land[]> {
  return of(MOCK_LANDS).pipe(delay(500));
}
```

**بعد:**

```typescript
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getFarmerLands(farmerId: string): Observable<Land[]> {
  return this.http.get<Land[]>(`${environment.apiUrl}/farmers/${farmerId}/lands`);
}

getLandDetails(landId: string): Observable<Land> {
  return this.http.get<Land>(`${environment.apiUrl}/lands/${landId}`);
}

addLand(land: Land): Observable<Land> {
  return this.http.post<Land>(`${environment.apiUrl}/lands`, land);
}

updateLand(landId: string, land: Partial<Land>): Observable<Land> {
  return this.http.put<Land>(`${environment.apiUrl}/lands/${landId}`, land);
}

deleteLand(landId: string): Observable<void> {
  return this.http.delete<void>(`${environment.apiUrl}/lands/${landId}`);
}
```

---

### Company Service

**بعد:**

```typescript
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getCompanyBlocks(companyId: string): Observable<Block[]> {
  return this.http.get<Block[]>(`${environment.apiUrl}/companies/${companyId}/blocks`);
}

getBlockDetails(blockId: string): Observable<Block> {
  return this.http.get<Block>(`${environment.apiUrl}/blocks/${blockId}`);
}

addBlock(block: Block): Observable<Block> {
  return this.http.post<Block>(`${environment.apiUrl}/blocks`, block);
}

updateBlock(blockId: string, block: Partial<Block>): Observable<Block> {
  return this.http.put<Block>(`${environment.apiUrl}/blocks/${blockId}`, block);
}
```

---

### Field Task Service

**بعد:**

```typescript
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getFieldTasks(): Observable<FieldTask[]> {
  return this.http.get<FieldTask[]>(`${environment.apiUrl}/field-tasks`);
}

getTaskById(taskId: string): Observable<FieldTask> {
  return this.http.get<FieldTask>(`${environment.apiUrl}/field-tasks/${taskId}`);
}

updateTaskStatus(taskId: string, status: string): Observable<FieldTask> {
  return this.http.patch<FieldTask>(`${environment.apiUrl}/field-tasks/${taskId}/status`, {
    status
  });
}

uploadTaskPhoto(taskId: string, photo: File): Observable<any> {
  const formData = new FormData();
  formData.append('photo', photo);

  return this.http.post(`${environment.apiUrl}/field-tasks/${taskId}/photos`, formData);
}
```

---

### Contract Service

**بعد:**

```typescript
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getFarmerContracts(farmerId: string): Observable<Contract[]> {
  return this.http.get<Contract[]>(`${environment.apiUrl}/farmers/${farmerId}/contracts`);
}

getCompanyContracts(companyId: string): Observable<Contract[]> {
  return this.http.get<Contract[]>(`${environment.apiUrl}/companies/${companyId}/contracts`);
}

getContractById(contractId: string): Observable<Contract> {
  return this.http.get<Contract>(`${environment.apiUrl}/contracts/${contractId}`);
}

downloadContractPDF(contractId: string): Observable<Blob> {
  return this.http.get(`${environment.apiUrl}/contracts/${contractId}/pdf`, {
    responseType: 'blob'
  });
}
```

---

### Notification Service

**بعد:**

```typescript
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

private notificationsSubject = new BehaviorSubject<Notification[]>([]);
public notifications$ = this.notificationsSubject.asObservable();

constructor(private http: HttpClient) {
  this.loadNotifications();
}

private loadNotifications(): void {
  this.http.get<Notification[]>(`${environment.apiUrl}/notifications`).subscribe({
    next: (notifications) => this.notificationsSubject.next(notifications),
    error: (error) => console.error('Error loading notifications:', error)
  });
}

markAsRead(notificationId: string): Observable<void> {
  return this.http.patch<void>(`${environment.apiUrl}/notifications/${notificationId}/read`, {});
}

markAllAsRead(): Observable<void> {
  return this.http.post<void>(`${environment.apiUrl}/notifications/read-all`, {});
}
```

---

## 🔐 معالجة المصادقة

### تحديث Auth Interceptor

```typescript
// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    }

    return next.handle(request);
  }
}
```

---

## 🎨 معالجة الأخطاء

### تحديث Error Interceptor

```typescript
// src/app/core/interceptors/error.interceptor.ts
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastService } from "../services/toast.service";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "حدث خطأ ما";

        if (error.error instanceof ErrorEvent) {
          // خطأ من جانب العميل
          errorMessage = error.error.message;
        } else {
          // خطأ من جانب الخادم
          switch (error.status) {
            case 401:
              errorMessage = "يجب تسجيل الدخول أولاً";
              this.router.navigate(["/auth/login"]);
              break;
            case 403:
              errorMessage = "ليس لديك صلاحية للوصول";
              break;
            case 404:
              errorMessage = "المورد المطلوب غير موجود";
              break;
            case 500:
              errorMessage = "خطأ في الخادم";
              break;
            default:
              errorMessage = error.error?.message || "حدث خطأ ما";
          }
        }

        this.toastService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
```

---

## 📤 رفع الملفات

### مثال على رفع صورة

```typescript
uploadFile(file: File, type: string): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  return this.http.post(`${environment.apiUrl}/upload`, formData, {
    reportProgress: true,
    observe: 'events'
  }).pipe(
    map((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
  );
}
```

---

## 🔄 معالجة التحميل

### استخدام Loading Interceptor

```typescript
// src/app/core/interceptors/loading.interceptor.ts
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingService } from "../services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // زيادة عدد الطلبات النشطة
    if (this.activeRequests === 0) {
      this.loadingService.show();
    }
    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        // تقليل عدد الطلبات النشطة
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
```

---

## 🧪 الاختبار

### اختبار الـ API

استخدم هذا المثال لاختبار الـ API:

```typescript
// في المكون
ngOnInit(): void {
  this.testAPI();
}

testAPI(): void {
  this.authService.login('test@example.com', 'password').subscribe({
    next: (response) => {
      console.log('✅ Login successful:', response);
    },
    error: (error) => {
      console.error('❌ Login failed:', error);
    }
  });
}
```

---

## 📝 قائمة التحقق

عند الربط بالـ Backend، تأكد من:

- [ ] تحديث `environment.ts` بعنوان API الصحيح
- [ ] إزالة البيانات الوهمية من جميع الخدمات
- [ ] تحديث Auth Interceptor
- [ ] تحديث Error Interceptor
- [ ] اختبار جميع الـ endpoints
- [ ] معالجة جميع حالات الأخطاء
- [ ] التأكد من التوافق مع Backend API
- [ ] اختبار رفع الملفات
- [ ] اختبار تنزيل الملفات
- [ ] التأكد من عمل المصادقة

---

## 🔍 نقاط مهمة

### CORS

تأكد من إعداد CORS في Backend:

```typescript
// مثال Express.js
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
```

### Headers

تأكد من إرسال Headers الصحيحة:

```typescript
{
  'Authorization': 'Bearer YOUR_TOKEN',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

### Response Format

تأكد من توافق صيغة الاستجابة:

```typescript
// مثال على صيغة الاستجابة المتوقعة
{
  "success": true,
  "data": {...},
  "message": "تمت العملية بنجاح"
}
```

---

## 📚 موارد إضافية

- [Angular HttpClient Documentation](https://angular.io/guide/http)
- [RxJS Operators](https://rxjs.dev/guide/operators)
- [Angular Interceptors](https://angular.io/guide/http#intercepting-requests-and-responses)

---

## 🎉 النتيجة

بعد اتباع هذه الخطوات، سيكون المشروع متصلاً بالكامل بـ Backend حقيقي وجاهزاً للإنتاج! 🚀

---

**تم إنشاء هذا الدليل بواسطة GitHub Copilot**  
**آخر تحديث:** 2024
