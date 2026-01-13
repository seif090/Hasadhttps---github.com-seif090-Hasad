/**
 * نموذج الإشعار
 */
export interface Notification {
  id: string;
  userId: string;
  type:
    | 'مهمة جديدة'
    | 'تحديث عقد'
    | 'موعد دفع'
    | 'تنبيه حصاد'
    | 'تقرير جديد'
    | 'رسالة';
  title: string;
  message: string;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  isRead: boolean;
  relatedEntityId?: string; // معرف العنصر المرتبط (مهمة، عقد، إلخ)
  relatedEntityType?: string;
  actionUrl?: string;
  actionText?: string;
  createdAt: Date;
}

/**
 * نموذج التنبيه
 */
export interface Alert {
  id: string;
  type: 'SMS' | 'Email' | 'Push';
  recipient: string;
  subject: string;
  content: string;
  status: 'معلق' | 'تم الإرسال' | 'فشل';
  sentAt?: Date;
  createdAt: Date;
}
