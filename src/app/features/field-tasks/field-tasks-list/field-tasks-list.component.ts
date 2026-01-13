import { Component, OnInit } from '@angular/core';
import { FieldTaskService } from '../../../core/services/field-task.service';
import { FieldTask } from '../../../core/models/field-task.model';
import { ToastService } from '../../../core/services/toast.service';

/**
 * قائمة المهام الميدانية
 */
@Component({
  selector: 'app-field-tasks-list',
  templateUrl: './field-tasks-list.component.html',
  styleUrls: ['./field-tasks-list.component.scss'],
})
export class FieldTasksListComponent implements OnInit {
  tasks: FieldTask[] = [];
  filteredTasks: FieldTask[] = [];
  loading = false;

  // Filters
  searchTerm = '';
  selectedStatus = '';
  selectedPriority = '';

  // Stats
  stats = {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  };

  constructor(
    private fieldTaskService: FieldTaskService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * تحميل المهام
   */
  loadTasks(): void {
    this.loading = true;

    this.fieldTaskService.getAgentTasks('AGENT-001').subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
        this.calculateStats(tasks);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.toastService.error('فشل تحميل المهام');
        this.loading = false;
      },
    });
  }

  /**
   * حساب الإحصائيات
   */
  calculateStats(tasks: FieldTask[]): void {
    this.stats.total = tasks.length;
    this.stats.pending = tasks.filter(
      (t) => t.status === 'قيد الانتظار'
    ).length;
    this.stats.inProgress = tasks.filter(
      (t) => t.status === 'جاري التنفيذ'
    ).length;
    this.stats.completed = tasks.filter((t) => t.status === 'مكتملة').length;
  }

  /**
   * تطبيق الفلاتر
   */
  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesSearch =
        !this.searchTerm ||
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.landName.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || task.status === this.selectedStatus;
      const matchesPriority =
        !this.selectedPriority || task.priority === this.selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  /**
   * مسح الفلاتر
   */
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedPriority = '';
    this.filteredTasks = this.tasks;
  }

  /**
   * تحديث حالة المهمة
   */
  updateTaskStatus(taskId: string, newStatus: string): void {
    this.fieldTaskService.updateTaskStatus(taskId, newStatus).subscribe({
      next: () => {
        this.toastService.success('تم تحديث حالة المهمة بنجاح');
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error updating task status:', error);
        this.toastService.error('فشل تحديث حالة المهمة');
      },
    });
  }

  /**
   * الحصول على لون الحالة
   */
  getStatusColor(status: string): 'success' | 'warning' | 'info' | 'danger' {
    switch (status) {
      case 'مكتملة':
        return 'success';
      case 'جاري التنفيذ':
        return 'info';
      case 'قيد الانتظار':
        return 'warning';
      case 'ملغاة':
        return 'danger';
      default:
        return 'info';
    }
  }

  /**
   * الحصول على لون الأولوية
   */
  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'عاجلة':
        return 'bg-red-100 text-red-800';
      case 'عالية':
        return 'bg-orange-100 text-orange-800';
      case 'متوسطة':
        return 'bg-yellow-100 text-yellow-800';
      case 'منخفضة':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  /**
   * الحصول على أيقونة الأولوية
   */
  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'عاجلة':
        return '🔴';
      case 'عالية':
        return '🟠';
      case 'متوسطة':
        return '🟡';
      case 'منخفضة':
        return '🔵';
      default:
        return '⚪';
    }
  }
}
