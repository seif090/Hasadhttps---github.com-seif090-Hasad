/**
 * Utility Helper Functions
 * مجموعة من الدوال المساعدة المستخدمة في التطبيق
 */

/**
 * تأخير التنفيذ لمدة معينة
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * توليد ID فريد
 */
export function generateUniqueId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * تحويل الأرقام الإنجليزية إلى عربية
 */
export function toArabicNumbers(value: string | number): string {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(value).replace(
    /[0-9]/g,
    (digit) => arabicNumbers[parseInt(digit)]
  );
}

/**
 * تحويل الأرقام العربية إلى إنجليزية
 */
export function toEnglishNumbers(value: string): string {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  let result = value;
  arabicNumbers.forEach((arabic, index) => {
    result = result.replace(new RegExp(arabic, 'g'), index.toString());
  });
  return result;
}

/**
 * تنسيق الأرقام مع فواصل الآلاف
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * تنسيق العملة
 */
export function formatCurrency(
  value: number,
  currency: string = 'جنيه'
): string {
  return `${formatNumber(value, 2)} ${currency}`;
}

/**
 * تقصير النص مع إضافة نقاط
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

/**
 * استخراج الأحرف الأولى من الاسم
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * التحقق من وجود قيمة (ليست null أو undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * التحقق من كون القيمة فارغة
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * نسخ عميقة للكائن
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * دمج الكائنات
 */
export function mergeObjects<T extends object>(
  target: T,
  ...sources: Partial<T>[]
): T {
  return Object.assign({}, target, ...sources);
}

/**
 * إزالة القيم المكررة من المصفوفة
 */
export function uniqueArray<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * ترتيب المصفوفة حسب خاصية معينة
 */
export function sortByProperty<T>(
  array: T[],
  property: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return array.sort((a, b) => {
    const aValue = a[property];
    const bValue = b[property];

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * تجميع المصفوفة حسب خاصية معينة
 */
export function groupBy<T>(array: T[], property: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const key = String(item[property]);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * تحويل الملف إلى Base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * تنزيل ملف
 */
export function downloadFile(data: Blob, filename: string): void {
  const url = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}

/**
 * نسخ النص إلى الحافظة
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

/**
 * التحقق من البريد الإلكتروني
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * التحقق من رقم الهاتف المصري
 */
export function isValidEgyptianPhone(phone: string): boolean {
  const phoneRegex = /^((\+?20)|0)?1[0125][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * حساب الفرق بين تاريخين بالأيام
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}

/**
 * التحقق من انتهاء التاريخ
 */
export function isDateExpired(date: Date): boolean {
  return date.getTime() < Date.now();
}

/**
 * تحويل الكائن إلى Query String
 */
export function objectToQueryString(obj: Record<string, any>): string {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null && obj[key] !== undefined)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

/**
 * تحويل Query String إلى كائن
 */
export function queryStringToObject(
  queryString: string
): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

/**
 * التحقق من كون المتصفح يدعم LocalStorage
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * حفظ البيانات في LocalStorage بشكل آمن
 */
export function safeLocalStorageSet(key: string, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('LocalStorage Error:', error);
    return false;
  }
}

/**
 * استرجاع البيانات من LocalStorage بشكل آمن
 */
export function safeLocalStorageGet<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('LocalStorage Error:', error);
    return null;
  }
}
