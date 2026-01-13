# دليل المطور - منصة حصاد

<div dir="rtl">

## نظرة عامة على البنية

تم تصميم منصة حصاد باستخدام **Angular 16** مع **TailwindCSS** لتوفير تجربة مستخدم حديثة وسريعة. المشروع يتبع **Modular Architecture** لسهولة التوسع والصيانة.

## البنية العامة

### 1. Core Module (`src/app/core/`)

الوحدة الأساسية التي تُستورد مرة واحدة فقط في `AppModule`.

**المحتويات:**

- **models/**: نماذج البيانات (User, Land, Contract, etc.)
- **services/**: الخدمات المشتركة (Auth, Land, Contract, etc.)
- **guards/**: حراس التوجيه (AuthGuard)

**الخدمات المتاحة:**

```typescript
// AuthService - إدارة المصادقة
login(credentials: LoginCredentials): Observable<AuthResponse>
register(data: RegisterData): Observable<AuthResponse>
logout(): void
getCurrentUser(): User | null

// LandService - إدارة الأراضي
getFarmerLands(farmerId: string): Observable<Land[]>
getLandById(landId: string): Observable<Land>
getCropCyclesByLand(landId: string): Observable<CropCycle[]>

// ContractService - إدارة العقود
getFarmerContracts(farmerId: string): Observable<Contract[]>
getContractById(contractId: string): Observable<Contract>
downloadContractPDF(contractId: string): Observable<Blob>

// CompanyService - إدارة الشركات
getCompanyBlocks(companyId: string): Observable<LandBlock[]>
getBlockFinancialReports(blockId: string): Observable<FinancialReport[]>

// FieldTaskService - المهام الميدانية
getAgentTasks(agentId: string): Observable<FieldTask[]>
updateTaskStatus(taskId: string, status: string): Observable<FieldTask>

// NotificationService - الإشعارات
getUserNotifications(userId: string): Observable<Notification[]>
markAsRead(notificationId: string): Observable<boolean>
```

### 2. Shared Module (`src/app/shared/`)

الوحدة المشتركة التي تُستورد في جميع الوحدات الأخرى.

**المكونات:**

- **Sidebar**: الشريط الجانبي للتنقل
- **Topbar**: الشريط العلوي
- **Card**: بطاقة قابلة لإعادة الاستخدام
- **Button**: زر مخصص
- **Badge**: شارة الحالة
- **Loader**: مؤشر التحميل
- **Modal**: نافذة منبثقة

**مثال استخدام:**

```typescript
import { SharedModule } from "@shared/shared.module";

@NgModule({
  imports: [SharedModule],
})
export class FeatureModule {}
```

### 3. Features Modules (`src/app/features/`)

#### Auth Module - التسجيل والدخول

```
features/auth/
├── login/
│   ├── login.component.ts
│   ├── login.component.html
│   └── login.component.scss
├── register/
│   ├── register.component.ts
│   ├── register.component.html
│   └── register.component.scss
├── auth.module.ts
└── auth-routing.module.ts
```

**الميزات:**

- تسجيل دخول مع Validation
- تسجيل مستخدم جديد (مزارع/شركة)
- حفظ التوكن في localStorage
- إعادة توجيه تلقائية بعد الدخول

#### Farmer Module - وحدة المزارع

```
features/farmer/
├── farmer-dashboard/
│   ├── farmer-dashboard.component.ts
│   └── farmer-dashboard.component.html
├── farmer-lands/
│   ├── farmer-lands.component.ts
│   └── farmer-lands.component.html
├── land-detail/
│   ├── land-detail.component.ts
│   └── land-detail.component.html
├── farmer.module.ts
└── farmer-routing.module.ts
```

**الميزات المُنفذة:**

- ✅ Dashboard مع إحصائيات شاملة
- ✅ قائمة الأراضي مع البحث والفلترة
- ✅ تفاصيل الأرض مع تبويبات (الدورات الزراعية، الحصاد، العقود)

#### الوحدات الأخرى

```
features/
├── company/        # لوحة الشركات
├── field-tasks/    # المهام الميدانية
├── contracts/      # العقود
├── reports/        # التقارير
└── notifications/  # الإشعارات
```

**الحالة:** هيكل أساسي جاهز للتطوير

## نماذج البيانات (Models)

### User Model

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "farmer" | "company" | "admin" | "field-agent";
  avatar?: string;
  createdAt: Date;
}
```

### Land Model

```typescript
interface Land {
  id: string;
  farmerId: string;
  area: number;
  location: {
    governorate: string;
    district: string;
    village: string;
    coordinates?: { lat: number; lng: number };
  };
  soilType: "طينية" | "رملية" | "طينية رملية" | "صفراء";
  status: "متاحة" | "مؤجرة" | "قيد الزراعة" | "تحت الصيانة";
  irrigationType: string;
  currentCrop?: string;
  contracts: string[];
}
```

### Contract Model

```typescript
interface Contract {
  id: string;
  type: "إيجار" | "شراكة" | "خدمات زراعية";
  farmerId: string;
  companyId: string;
  landIds: string[];
  startDate: Date;
  endDate: Date;
  status: "نشط" | "منتهي" | "معلق" | "ملغي";
  terms: {
    totalAmount: number;
    paymentSchedule: string;
    paymentMethod: string;
  };
}
```

## التوجيه (Routing)

### المسارات الرئيسية

```typescript
const routes = [
  { path: "", redirectTo: "/auth/login", pathMatch: "full" },
  { path: "auth", loadChildren: () => AuthModule },
  { path: "farmer", loadChildren: () => FarmerModule, canActivate: [AuthGuard] },
  { path: "company", loadChildren: () => CompanyModule, canActivate: [AuthGuard] },
  { path: "field-tasks", loadChildren: () => FieldTasksModule, canActivate: [AuthGuard] },
  { path: "contracts", loadChildren: () => ContractsModule, canActivate: [AuthGuard] },
  { path: "reports", loadChildren: () => ReportsModule, canActivate: [AuthGuard] },
  { path: "notifications", loadChildren: () => NotificationsModule, canActivate: [AuthGuard] },
];
```

### Lazy Loading

جميع الوحدات تستخدم Lazy Loading لتحسين الأداء.

## التنسيقات (Styling)

### TailwindCSS Classes المخصصة

```scss
// أزرار
.btn-primary       // زر أساسي أخضر
.btn-secondary     // زر ثانوي رمادي

// بطاقات
.card             // بطاقة بيضاء مع ظل

// حقول الإدخال
.input-field      // حقل إدخال مع تنسيق موحد
.label            // تسمية الحقل

// شارات
.badge           // شارة أساسية
.badge-success   // شارة خضراء
.badge-warning   // شارة صفراء
.badge-danger    // شارة حمراء
.badge-info      // شارة زرقاء
```

### الألوان الأساسية

```javascript
primary: {
  500: '#22c55e',  // أخضر أساسي
  600: '#16a34a',  // أخضر غامق
  700: '#15803d'   // أخضر داكن
}
```

## Mock Data

جميع الخدمات تحتوي على بيانات تجريبية:

```typescript
// في LandService
private mockLands: Land[] = [
  {
    id: '1',
    farmerId: '1',
    area: 5,
    location: {
      governorate: 'الدقهلية',
      district: 'المنصورة',
      village: 'ميت غمر'
    },
    // ... باقي البيانات
  }
];
```

**للتكامل مع Backend:**

1. استبدل `of(mockData)` بـ `this.http.get()`
2. حدّث `environment.apiUrl`
3. أضف معالجة الأخطاء

## إضافة ميزة جديدة

### خطوات إضافة صفحة جديدة:

1. **إنشاء Component**

```bash
ng generate component features/module-name/component-name
```

2. **إضافة المسار**

```typescript
// في module-routing.module.ts
const routes = [
  {
    path: "new-page",
    component: NewPageComponent,
  },
];
```

3. **استخدام Shared Components**

```html
<div class="flex min-h-screen bg-gray-50">
  <app-sidebar></app-sidebar>
  <div class="flex-1 mr-64">
    <app-topbar></app-topbar>
    <main class="p-6">
      <!-- محتوى الصفحة -->
    </main>
  </div>
</div>
```

## Best Practices

### 1. استخدام Reactive Forms

```typescript
loginForm = this.fb.group({
  email: ["", [Validators.required, Validators.email]],
  password: ["", [Validators.required, Validators.minLength(6)]],
});
```

### 2. استخدام Observables

```typescript
this.landService.getLands().subscribe((lands) => {
  this.lands = lands;
});
```

### 3. التعليقات بالعربي

```typescript
/**
 * تحميل بيانات الأراضي من الخادم
 */
loadLands(): void {
  // ...
}
```

### 4. معالجة الأخطاء

```typescript
this.service.getData().subscribe({
  next: (data) => {
    /* النجاح */
  },
  error: (error) => {
    /* الخطأ */
  },
});
```

## الاختبار

### تشغيل الاختبارات

```bash
npm test
```

### إنشاء Build للإنتاج

```bash
npm run build
```

## استكشاف الأخطاء

### مشكلة: الصفحة فارغة

**الحل**: تحقق من تسجيل الدخول و AuthGuard

### مشكلة: TailwindCSS لا يعمل

**الحل**: تأكد من استيراد `styles.scss` في `angular.json`

### مشكلة: Module not found

**الحل**: تحقق من `tsconfig.json` paths

## الدعم والمساهمة

للمساهمة في تطوير المنصة:

1. Fork المشروع
2. إنشاء feature branch
3. Commit التغييرات
4. Push وفتح Pull Request

---

**تم التطوير بواسطة InomTech** 🌾

</div>
