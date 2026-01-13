/**
 * نموذج المهمة الميدانية
 */
export interface FieldTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // معرف المندوب الميداني
  assignedToName: string;
  landId: string;
  blockId?: string;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  status: 'جديدة' | 'قيد التنفيذ' | 'مكتملة' | 'ملغاة';
  dueDate: Date;
  completedDate?: Date;
  location: {
    governorate: string;
    district: string;
    village: string;
  };
  images: string[];
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * نموذج تقرير المهمة
 */
export interface TaskReport {
  taskId: string;
  images: File[];
  notes: string;
  status: 'مكتملة' | 'بحاجة لمتابعة';
  submittedAt: Date;
}
