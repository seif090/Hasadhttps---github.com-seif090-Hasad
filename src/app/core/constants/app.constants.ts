/**
 * ثوابت التطبيق
 * جميع القيم الثابتة المستخدمة في التطبيق
 */

// أدوار المستخدمين
export const USER_ROLES = {
  FARMER: 'farmer',
  COMPANY: 'company',
  FIELD_AGENT: 'field-agent',
  ADMIN: 'admin',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// حالات الأراضي
export const LAND_STATUS = {
  AVAILABLE: 'متاحة',
  CONTRACTED: 'متعاقد عليها',
  UNDER_CULTIVATION: 'تحت الزراعة',
  HARVESTED: 'تم الحصاد',
} as const;

// أنواع المحاصيل
export const CROP_TYPES = [
  'قمح',
  'ذرة',
  'أرز',
  'قطن',
  'بطاطس',
  'طماطم',
  'فول',
  'عدس',
  'برسيم',
  'قصب السكر',
  'بنجر السكر',
  'فاصوليا',
  'بصل',
  'ثوم',
  'خيار',
] as const;

// المحافظات المصرية
export const GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الدقهلية',
  'الشرقية',
  'المنوفية',
  'القليوبية',
  'البحيرة',
  'الغربية',
  'كفر الشيخ',
  'دمياط',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
  'شمال سيناء',
  'جنوب سيناء',
] as const;

// حالات المهام الميدانية
export const TASK_STATUS = {
  PENDING: 'قيد الانتظار',
  IN_PROGRESS: 'جاري التنفيذ',
  COMPLETED: 'مكتملة',
  CANCELLED: 'ملغاة',
} as const;

// أولويات المهام
export const TASK_PRIORITY = {
  LOW: 'منخفضة',
  MEDIUM: 'متوسطة',
  HIGH: 'عالية',
  URGENT: 'عاجلة',
} as const;

// حالات العقود
export const CONTRACT_STATUS = {
  DRAFT: 'مسودة',
  PENDING: 'قيد المراجعة',
  ACTIVE: 'نشط',
  COMPLETED: 'مكتمل',
  CANCELLED: 'ملغى',
} as const;

// أنواع الإشعارات
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// أنواع الدفع
export const PAYMENT_METHODS = {
  CASH: 'نقدي',
  BANK_TRANSFER: 'تحويل بنكي',
  CHECK: 'شيك',
  MOBILE_WALLET: 'محفظة إلكترونية',
} as const;

// مدد العقود (بالأشهر)
export const CONTRACT_DURATIONS = [3, 6, 12, 24, 36] as const;

// الصفحات والحد الأقصى للعناصر
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// التنسيقات
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  API: 'yyyy-MM-dd',
  DATETIME: 'dd/MM/yyyy HH:mm',
} as const;

// حدود الملفات
export const FILE_LIMITS = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
} as const;

// رسائل التحقق
export const VALIDATION_MESSAGES = {
  REQUIRED: 'هذا الحقل مطلوب',
  EMAIL: 'البريد الإلكتروني غير صحيح',
  MIN_LENGTH: (min: number) => `يجب أن يحتوي على ${min} أحرف على الأقل`,
  MAX_LENGTH: (max: number) => `يجب ألا يتجاوز ${max} حرف`,
  PATTERN: 'التنسيق غير صحيح',
  MIN: (min: number) => `القيمة يجب أن تكون أكبر من أو تساوي ${min}`,
  MAX: (max: number) => `القيمة يجب أن تكون أقل من أو تساوي ${max}`,
  PHONE: 'رقم الهاتف غير صحيح',
  NATIONAL_ID: 'الرقم القومي غير صحيح',
  PASSWORD_MISMATCH: 'كلمات المرور غير متطابقة',
} as const;

// مفاتيح التخزين المحلي
export const STORAGE_KEYS = {
  TOKEN: 'hasad_token',
  USER: 'hasad_user',
  LANGUAGE: 'hasad_language',
  THEME: 'hasad_theme',
} as const;

// إعدادات API
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 ثانية
  RETRY_COUNT: 2,
  RETRY_DELAY: 1000, // 1 ثانية
} as const;
