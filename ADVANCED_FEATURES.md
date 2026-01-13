# استخدام الـ Interceptors والخدمات الاحترافية

## نظرة عامة

تم إضافة مجموعة احترافية من الـ Interceptors والخدمات والـ Utilities لتحسين جودة الكود وتجربة المستخدم.

## 1. HTTP Interceptors

### Auth Interceptor

يضيف JWT Token تلقائياً لكل طلب HTTP:

```typescript
// يتم تطبيقه تلقائياً، لا حاجة لكود إضافي
// Token يُضاف من localStorage تلقائياً
```

### Loading Interceptor

يعرض مؤشر التحميل تلقائياً مع كل طلب HTTP:

```typescript
// للتجاهل في طلبات معينة:
const headers = new HttpHeaders({
  "X-Skip-Loading": "true",
});
this.http.get(url, { headers });
```

### Error Interceptor

يعالج الأخطاء تلقائياً ويعرضها للمستخدم:

```typescript
// يعرض رسالة خطأ تلقائياً في Toast
// يعيد المحاولة مرة واحدة في حالة الفشل
```

## 2. Toast Service

### استخدام Toast للإشعارات

```typescript
import { ToastService } from '@core/services/toast.service';

constructor(private toastService: ToastService) {}

// رسالة نجاح
this.toastService.success('تم الحفظ بنجاح');

// رسالة خطأ
this.toastService.error('حدث خطأ أثناء الحفظ');

// رسالة تحذير
this.toastService.warning('يرجى مراجعة البيانات');

// رسالة معلومات
this.toastService.info('لديك إشعار جديد');

// مع مدة مخصصة (بالميلي ثانية)
this.toastService.success('تم الحفظ', 5000);
```

## 3. Loading Service

### استخدام Loading Service

```typescript
import { LoadingService } from '@core/services/loading.service';

constructor(private loadingService: LoadingService) {}

// إظهار Loading
this.loadingService.show();

// إخفاء Loading
this.loadingService.hide();

// الحصول على حالة Loading
const isLoading = this.loadingService.isLoading();

// في Template
<div *ngIf="loadingService.loading$ | async">جاري التحميل...</div>
```

## 4. Custom Pipes

### Arabic Date Pipe

```html
<!-- Short: 13/1/2026 -->
{{ date | arabicDate:'short' }}

<!-- Medium: 13 يناير 2026 -->
{{ date | arabicDate:'medium' }}

<!-- Long: الإثنين، 13 يناير 2026 -->
{{ date | arabicDate:'long' }}
```

### Relative Time Pipe

```html
<!-- منذ ساعة، منذ يومين، إلخ -->
{{ notification.createdAt | relativeTime }}
```

### File Size Pipe

```html
<!-- 2.5 ميجابايت -->
{{ file.size | fileSize }}

<!-- مع عدد الأرقام العشرية -->
{{ file.size | fileSize:1 }}
```

## 5. Custom Directives

### Number Only Directive

```html
<!-- السماح بإدخال الأرقام فقط -->
<input type="text" appNumberOnly placeholder="رقم الهاتف" />
```

### Auto Focus Directive

```html
<!-- التركيز تلقائياً عند تحميل الصفحة -->
<input type="text" appAutoFocus />

<!-- بشرط معين -->
<input type="text" [appAutoFocus]="shouldFocus" />
```

### Click Outside Directive

```html
<!-- إطلاق حدث عند النقر خارج العنصر -->
<div (appClickOutside)="closeDropdown()">
  <!-- محتوى Dropdown -->
</div>
```

## 6. Custom Validators

### استخدام Custom Validators

```typescript
import { FormBuilder, Validators } from "@angular/forms";
import { egyptianPhoneValidator, egyptianNationalIdValidator, strongPasswordValidator, passwordMatchValidator } from "@core/validators/custom-validators";

this.form = this.fb.group(
  {
    // رقم الهاتف المصري
    phone: ["", [Validators.required, egyptianPhoneValidator()]],

    // الرقم القومي
    nationalId: ["", [egyptianNationalIdValidator()]],

    // كلمة مرور قوية
    password: ["", [Validators.required, strongPasswordValidator()]],

    // تأكيد كلمة المرور
    confirmPassword: ["", [Validators.required]],
  },
  {
    validators: [passwordMatchValidator("password", "confirmPassword")],
  }
);
```

### جميع الـ Validators المتاحة:

- `egyptianPhoneValidator()` - رقم هاتف مصري
- `egyptianNationalIdValidator()` - رقم قومي مصري
- `strongPasswordValidator()` - كلمة مرور قوية
- `passwordMatchValidator(field1, field2)` - تطابق كلمات المرور
- `rangeValidator(min, max)` - نطاق رقمي
- `fileSizeValidator(maxMB)` - حجم ملف
- `fileTypeValidator(types[])` - نوع ملف
- `futureDateValidator()` - تاريخ مستقبلي
- `urlValidator()` - URL صحيح

## 7. Helper Functions

### استخدام Helper Functions

```typescript
import { formatCurrency, formatNumber, truncateText, getInitials, copyToClipboard, downloadFile, daysBetween } from "@core/utils/helpers";

// تنسيق العملة
const price = formatCurrency(15000); // "15,000.00 جنيه"

// تنسيق الأرقام
const count = formatNumber(123456789); // "123,456,789"

// تقصير النص
const short = truncateText("نص طويل جداً...", 20); // "نص طويل جداً..."

// الأحرف الأولى
const initials = getInitials("محمد أحمد"); // "MA"

// نسخ للحافظة
await copyToClipboard("نص للنسخ");

// الفرق بين تاريخين
const days = daysBetween(new Date(), new Date("2026-12-31")); // عدد الأيام
```

## 8. Constants

### استخدام الثوابت

```typescript
import {
  USER_ROLES,
  LAND_STATUS,
  CROP_TYPES,
  GOVERNORATES,
  VALIDATION_MESSAGES
} from '@core/constants/app.constants';

// الأدوار
if (user.role === USER_ROLES.FARMER) {
  // منطق المزارع
}

// حالات الأراضي
const status = LAND_STATUS.AVAILABLE;

// المحافظات
<select>
  <option *ngFor="let gov of governorates" [value]="gov">
    {{ gov }}
  </option>
</select>

// رسائل التحقق
errors['required'] && VALIDATION_MESSAGES.REQUIRED
```

## 9. Preloading Strategy

تم تطبيق استراتيجية تحميل مسبق مخصصة للوحدات:

- تحمل الوحدات المهمة تلقائياً بعد تحميل الصفحة
- تحسن الأداء وسرعة التنقل
- قابلة للتخصيص لكل وحدة

## أمثلة شاملة

### مثال: نموذج تسجيل احترافي

```typescript
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { egyptianPhoneValidator, strongPasswordValidator, passwordMatchValidator } from "@core/validators/custom-validators";
import { ToastService } from "@core/services/toast.service";
import { VALIDATION_MESSAGES } from "@core/constants/app.constants";

@Component({
  selector: "app-register",
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="phone" appNumberOnly appAutoFocus placeholder="رقم الهاتف" />
      <div *ngIf="form.get('phone')?.errors?.['egyptianPhone']">رقم الهاتف غير صحيح</div>

      <input type="password" formControlName="password" placeholder="كلمة المرور" />

      <button type="submit" [disabled]="form.invalid">تسجيل</button>
    </form>
  `,
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        phone: ["", [Validators.required, egyptianPhoneValidator()]],
        password: ["", [Validators.required, strongPasswordValidator()]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validators: [passwordMatchValidator("password", "confirmPassword")],
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      // الحفظ
      this.toastService.success("تم التسجيل بنجاح");
    } else {
      this.toastService.error("يرجى مراجعة البيانات");
    }
  }
}
```

### مثال: قائمة مع تنسيق البيانات

```html
<div *ngFor="let land of lands">
  <h3>{{ land.name }}</h3>
  <p>{{ land.createdAt | arabicDate:'long' }}</p>
  <p>{{ land.updatedAt | relativeTime }}</p>
  <p>{{ land.area }} فدان</p>
  <p>{{ land.price | formatCurrency }}</p>
</div>
```

## الفوائد

1. **تقليل الكود المتكرر**: Interceptors تعمل تلقائياً
2. **تجربة مستخدم محسنة**: Toast و Loading تلقائي
3. **معالجة أخطاء موحدة**: Error handling مركزي
4. **تنسيق موحد**: Pipes و Helpers للبيانات
5. **سهولة الصيانة**: كود منظم وقابل لإعادة الاستخدام
6. **أداء محسن**: Preloading Strategy للوحدات
7. **تحقق قوي**: Custom Validators جاهزة

## ملاحظات مهمة

- جميع Interceptors تعمل تلقائياً بدون تدخل
- Toast Component يظهر في جميع الصفحات
- Loading Service متاح عالمياً
- جميع الـ Pipes و Directives متاحة في SharedModule
- Constants متاحة للاستيراد من أي مكان
- Helper Functions pure functions بدون side effects
