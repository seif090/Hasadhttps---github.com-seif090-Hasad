/**
 * نموذج المستخدم
 * يحتوي على جميع بيانات المستخدم في النظام
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'company' | 'admin' | 'field-agent';
  avatar?: string;
  createdAt: Date;
}

/**
 * نموذج بيانات تسجيل الدخول
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * نموذج بيانات التسجيل
 */
export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'farmer' | 'company';
  governorate?: string;
}

/**
 * نموذج استجابة المصادقة
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
