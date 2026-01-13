# دليل الإعداد والتشغيل - منصة حصاد

<div dir="rtl">

## المتطلبات الأساسية

قبل البدء، تأكد من تثبيت:

- **Node.js** (الإصدار 16 أو أحدث)

  - تحميل من: https://nodejs.org/
  - للتحقق: `node --version`

- **npm** (يأتي مع Node.js)

  - للتحقق: `npm --version`

- **Angular CLI** (الإصدار 16)

  ```bash
  npm install -g @angular/cli@16
  ```

- **محرر أكواد** (يُنصح بـ VS Code)
  - تحميل من: https://code.visualstudio.com/

## الخطوة 1: الحصول على المشروع

```bash
# إذا كان المشروع على Git
git clone <repository-url>
cd Hasad

# أو إذا كان لديك المجلد
cd c:\Users\seaif\Desktop\Hasad
```

## الخطوة 2: تثبيت الحزم

```bash
npm install
```

**ملاحظة**: قد تستغرق العملية 3-5 دقائق حسب سرعة الإنترنت.

### إذا واجهت مشاكل في التثبيت:

```bash
# حذف node_modules والملفات المؤقتة
rm -rf node_modules
rm package-lock.json

# إعادة التثبيت
npm install
```

## الخطوة 3: تشغيل المشروع

### تشغيل في وضع التطوير:

```bash
npm start
# أو
ng serve
```

**سيعمل المشروع على:** `http://localhost:4200`

### خيارات تشغيل إضافية:

```bash
# تشغيل على منفذ مختلف
ng serve --port 4300

# فتح المتصفح تلقائياً
ng serve --open

# وضع الإنتاج
ng serve --configuration production
```

## الخطوة 4: فتح المتصفح

1. افتح المتصفح
2. اذهب إلى: `http://localhost:4200`
3. ستظهر صفحة تسجيل الدخول

## حسابات تجريبية

### حساب مزارع 🌾

```
البريد الإلكتروني: farmer@hasad.com
كلمة المرور: 123456
```

### حساب شركة 🏢

```
البريد الإلكتروني: company@hasad.com
كلمة المرور: 123456
```

## البناء للإنتاج

### إنشاء Build:

```bash
npm run build
# أو
ng build --configuration production
```

**المخرجات في:** `dist/hasad-platform/`

### رفع على Server:

```bash
# نسخ محتويات dist/ إلى مجلد الـ web server
cp -r dist/hasad-platform/* /path/to/server/public/
```

## هيكل المشروع

```
Hasad/
├── src/
│   ├── app/
│   │   ├── core/           # الخدمات والنماذج الأساسية
│   │   ├── shared/         # المكونات المشتركة
│   │   ├── features/       # وحدات الميزات
│   │   └── app.module.ts   # الوحدة الرئيسية
│   ├── assets/             # الصور والملفات الثابتة
│   ├── environments/       # إعدادات البيئة
│   └── styles.scss         # التنسيقات العامة
├── angular.json            # إعدادات Angular
├── package.json            # الحزم والاعتماديات
├── tailwind.config.js      # إعدادات TailwindCSS
└── tsconfig.json           # إعدادات TypeScript
```

## الأوامر المهمة

### التطوير

```bash
npm start              # تشغيل خادم التطوير
npm test               # تشغيل الاختبارات
npm run build          # بناء المشروع
```

### Angular CLI

```bash
ng generate component features/module/component-name  # إنشاء مكون
ng generate service core/services/service-name         # إنشاء خدمة
ng generate module features/module-name --routing      # إنشاء وحدة
```

### أدوات المساعدة

```bash
ng version             # عرض إصدار Angular
ng help                # عرض المساعدة
ng build --help        # مساعدة أمر محدد
```

## استكشاف الأخطاء الشائعة

### خطأ: "ng: command not found"

**السبب**: Angular CLI غير مثبت
**الحل**:

```bash
npm install -g @angular/cli@16
```

### خطأ: "Port 4200 is already in use"

**السبب**: المنفذ مستخدم بواسطة تطبيق آخر
**الحل**:

```bash
# استخدم منفذ آخر
ng serve --port 4300
```

### خطأ: Module not found

**السبب**: الحزم غير مثبتة
**الحل**:

```bash
npm install
```

### خطأ: Cannot find module '@angular/core'

**السبب**: node_modules تالف
**الحل**:

```bash
rm -rf node_modules
npm install
```

### الصفحة بيضاء/فارغة

**الحل**:

1. افتح Developer Tools (F12)
2. تحقق من Console للأخطاء
3. تأكد من تشغيل `ng serve`

## تكوين البيئة

### Development Environment

ملف: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
};
```

### Production Environment

ملف: `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: "https://api.hasad.com/api",
};
```

## التكامل مع Backend API

### الخطوة 1: تحديث الـ API URL

في `environment.ts`:

```typescript
apiUrl: "https://your-backend-api.com/api";
```

### الخطوة 2: تحديث الخدمات

استبدل Mock Data بـ HTTP Calls:

**قبل:**

```typescript
getFarmerLands(farmerId: string): Observable<Land[]> {
  return of(this.mockLands).pipe(delay(500));
}
```

**بعد:**

```typescript
getFarmerLands(farmerId: string): Observable<Land[]> {
  return this.http.get<Land[]>(`${this.apiUrl}/lands?farmerId=${farmerId}`);
}
```

## إضافة مكتبات إضافية

### Charts (للرسوم البيانية)

```bash
npm install chart.js ng2-charts
```

### Angular Material

```bash
ng add @angular/material
```

### Moment.js (للتواريخ)

```bash
npm install moment
```

## نصائح للتطوير

### 1. استخدم Hot Reload

التغييرات تظهر تلقائياً في المتصفح

### 2. افتح VS Code

```bash
code .
```

### 3. استخدم Extensions مفيدة:

- Angular Language Service
- Tailwind CSS IntelliSense
- ESLint
- Prettier

### 4. تفعيل Auto Save في VS Code:

File → Auto Save ✓

## الأداء والتحسين

### تصغير حجم Build

```bash
ng build --configuration production --optimization
```

### تحليل حجم Bundle

```bash
ng build --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/hasad-platform/stats.json
```

## النشر (Deployment)

### على Netlify

```bash
ng build --configuration production
# ارفع محتويات dist/ على Netlify
```

### على Vercel

```bash
ng build --configuration production
# ارفع المشروع على Vercel
```

### على Apache/Nginx

```bash
ng build --configuration production
# انسخ dist/ إلى /var/www/html/
```

## الدعم

إذا واجهت مشاكل:

1. **تحقق من الأخطاء في Console**
2. **راجع [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)**
3. **تأكد من تثبيت جميع الحزم**
4. **جرّب حذف node_modules وإعادة التثبيت**

## الموارد المفيدة

- [Angular Documentation](https://angular.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**مبروك! 🎉 المشروع جاهز للعمل**

للمساعدة أو الدعم، تواصل مع فريق InomTech

</div>
