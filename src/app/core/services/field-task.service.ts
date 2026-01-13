import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FieldTask, TaskReport } from '../models/field-task.model';

/**
 * خدمة إدارة المهام الميدانية
 * توفر جميع العمليات المتعلقة بالمهام الميدانية
 */
@Injectable({
  providedIn: 'root',
})
export class FieldTaskService {
  // بيانات تجريبية للمهام الميدانية
  private mockTasks: FieldTask[] = [
    {
      id: 't1',
      title: 'فحص نظام الري',
      description: 'فحص شامل لنظام الري بالتنقيط والتأكد من عدم وجود تسريبات',
      assignedTo: 'agent1',
      assignedToName: 'محمود أحمد',
      landId: '1',
      blockId: 'b1',
      priority: 'عالية',
      status: 'قيد التنفيذ',
      dueDate: new Date('2025-01-20'),
      location: {
        governorate: 'الدقهلية',
        district: 'المنصورة',
        village: 'ميت غمر',
      },
      images: [],
      notes: ['تم البدء في الفحص', 'تم اكتشاف تسريب بسيط في الخط الرئيسي'],
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-15'),
    },
    {
      id: 't2',
      title: 'متابعة نمو المحصول',
      description:
        'متابعة حالة نمو محصول الطماطم وتقييم الحالة الصحية للنباتات',
      assignedTo: 'agent1',
      assignedToName: 'محمود أحمد',
      landId: '1',
      blockId: 'b1',
      priority: 'متوسطة',
      status: 'مكتملة',
      dueDate: new Date('2025-01-12'),
      completedDate: new Date('2025-01-12'),
      location: {
        governorate: 'الدقهلية',
        district: 'المنصورة',
        village: 'ميت غمر',
      },
      images: [
        'assets/images/task-1-photo-1.jpg',
        'assets/images/task-1-photo-2.jpg',
      ],
      notes: ['النباتات في حالة ممتازة', 'لا توجد علامات أمراض'],
      createdAt: new Date('2025-01-08'),
      updatedAt: new Date('2025-01-12'),
    },
    {
      id: 't3',
      title: 'رش المبيدات الحشرية',
      description: 'رش المبيدات الحشرية للوقاية من الآفات',
      assignedTo: 'agent2',
      assignedToName: 'خالد سعيد',
      landId: '3',
      priority: 'عالية',
      status: 'جديدة',
      dueDate: new Date('2025-01-18'),
      location: {
        governorate: 'الشرقية',
        district: 'الزقازيق',
        village: 'أبو حماد',
      },
      images: [],
      notes: [],
      createdAt: new Date('2025-01-13'),
      updatedAt: new Date('2025-01-13'),
    },
    {
      id: 't4',
      title: 'تقييم جودة التربة',
      description: 'أخذ عينات من التربة وإرسالها للمختبر لتحليل مكوناتها',
      assignedTo: 'agent1',
      assignedToName: 'محمود أحمد',
      landId: '2',
      priority: 'منخفضة',
      status: 'جديدة',
      dueDate: new Date('2025-01-25'),
      location: {
        governorate: 'الدقهلية',
        district: 'المنصورة',
        village: 'ميت غمر',
      },
      images: [],
      notes: [],
      createdAt: new Date('2025-01-13'),
      updatedAt: new Date('2025-01-13'),
    },
    {
      id: 't5',
      title: 'فحص معدات الحصاد',
      description: 'فحص وصيانة معدات الحصاد استعداداً لموسم الحصاد القادم',
      assignedTo: 'agent2',
      assignedToName: 'خالد سعيد',
      landId: '3',
      priority: 'متوسطة',
      status: 'قيد التنفيذ',
      dueDate: new Date('2025-01-22'),
      location: {
        governorate: 'الشرقية',
        district: 'الزقازيق',
        village: 'أبو حماد',
      },
      images: ['assets/images/equipment-check.jpg'],
      notes: ['تم فحص الجرار', 'يحتاج تغيير الزيت'],
      createdAt: new Date('2025-01-11'),
      updatedAt: new Date('2025-01-14'),
    },
  ];

  constructor() {}

  /**
   * الحصول على جميع المهام
   */
  getAllTasks(): Observable<FieldTask[]> {
    return of(this.mockTasks).pipe(delay(500));
  }

  /**
   * الحصول على مهام مندوب ميداني
   */
  getAgentTasks(agentId: string): Observable<FieldTask[]> {
    const tasks = this.mockTasks.filter((task) => task.assignedTo === agentId);
    return of(tasks).pipe(delay(500));
  }

  /**
   * الحصول على مهام أرض محددة
   */
  getLandTasks(landId: string): Observable<FieldTask[]> {
    const tasks = this.mockTasks.filter((task) => task.landId === landId);
    return of(tasks).pipe(delay(400));
  }

  /**
   * الحصول على مهام كتلة زراعية
   */
  getBlockTasks(blockId: string): Observable<FieldTask[]> {
    const tasks = this.mockTasks.filter((task) => task.blockId === blockId);
    return of(tasks).pipe(delay(400));
  }

  /**
   * الحصول على تفاصيل مهمة
   */
  getTaskById(taskId: string): Observable<FieldTask | undefined> {
    const task = this.mockTasks.find((t) => t.id === taskId);
    return of(task).pipe(delay(300));
  }

  /**
   * تحديث حالة المهمة
   */
  updateTaskStatus(
    taskId: string,
    status: string
  ): Observable<FieldTask | undefined> {
    const task = this.mockTasks.find((t) => t.id === taskId);
    if (task) {
      task.status = status as any;
      task.updatedAt = new Date();
      if (status === 'مكتملة') {
        task.completedDate = new Date();
      }
    }
    return of(task).pipe(delay(500));
  }

  /**
   * رفع تقرير مهمة
   */
  uploadTaskReport(report: TaskReport): Observable<boolean> {
    console.log('رفع تقرير المهمة:', report);
    // محاكاة رفع التقرير والصور
    return of(true).pipe(delay(1000));
  }

  /**
   * الحصول على إحصائيات المهام
   */
  getTaskStats(): Observable<any> {
    return of({
      total: this.mockTasks.length,
      new: this.mockTasks.filter((t) => t.status === 'جديدة').length,
      inProgress: this.mockTasks.filter((t) => t.status === 'قيد التنفيذ')
        .length,
      completed: this.mockTasks.filter((t) => t.status === 'مكتملة').length,
      highPriority: this.mockTasks.filter((t) => t.priority === 'عالية').length,
    }).pipe(delay(300));
  }
}
