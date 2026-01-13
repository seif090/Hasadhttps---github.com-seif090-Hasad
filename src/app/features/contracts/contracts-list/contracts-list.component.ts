import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../../core/services/contract.service';
import { Contract } from '../../../core/models/contract.model';
import { ToastService } from '../../../core/services/toast.service';

/**
 * قائمة العقود
 */
@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss'],
})
export class ContractsListComponent implements OnInit {
  contracts: Contract[] = [];
  filteredContracts: Contract[] = [];
  loading = false;

  // Filters
  searchTerm = '';
  selectedStatus = '';
  selectedType = '';

  // Stats
  stats = {
    total: 0,
    active: 0,
    completed: 0,
    pending: 0,
    totalValue: 0,
  };

  constructor(
    private contractService: ContractService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  getPaymentPercentage(contract: Contract): number {
    if (!contract.totalValue) return 0;
    return ((contract.paidAmount || 0) / contract.totalValue) * 100;
  }

  /**
   * تحميل العقود
   */
  loadContracts(): void {
    this.loading = true;

    this.contractService.getFarmerContracts('FARMER-001').subscribe({
      next: (contracts) => {
        this.contracts = contracts;
        this.filteredContracts = contracts;
        this.calculateStats(contracts);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading contracts:', error);
        this.toastService.error('فشل تحميل العقود');
        this.loading = false;
      },
    });
  }

  /**
   * حساب الإحصائيات
   */
  calculateStats(contracts: Contract[]): void {
    this.stats.total = contracts.length;
    this.stats.active = contracts.filter((c) => c.status === 'نشط').length;
    this.stats.completed = contracts.filter((c) => c.status === 'مكتمل').length;
    this.stats.pending = contracts.filter(
      (c) => c.status === 'قيد المراجعة'
    ).length;
    this.stats.totalValue = contracts.reduce(
      (sum, c) => sum + (c.totalValue || 0),
      0
    );
  }

  /**
   * تطبيق الفلاتر
   */
  applyFilters(): void {
    this.filteredContracts = this.contracts.filter((contract) => {
      const matchesSearch =
        !this.searchTerm ||
        (contract.contractNumber || '')
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        contract.companyName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || contract.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get filteredTotalValue(): number {
    return this.filteredContracts.reduce(
      (sum, c) => sum + (c.totalValue || 0),
      0
    );
  }

  isPaymentOverdue(payment: any): boolean {
    return !payment.isPaid && new Date(payment.dueDate) <= new Date();
  }

  isPaymentDueSoon(payment: any): boolean {
    return !payment.isPaid && new Date(payment.dueDate) > new Date();
  }

  /**
   * مسح الفلاتر
   */
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedType = '';
    this.filteredContracts = this.contracts;
  }

  /**
   * تنزيل عقد PDF
   */
  downloadContract(contractId: string): void {
    this.contractService.downloadContractPDF(contractId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `contract_${contractId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.toastService.success('تم تنزيل العقد بنجاح');
      },
      error: (error) => {
        console.error('Error downloading contract:', error);
        this.toastService.error('فشل تنزيل العقد');
      },
    });
  }

  /**
   * الحصول على لون الحالة
   */
  getStatusColor(status: string): 'success' | 'warning' | 'info' | 'danger' {
    switch (status) {
      case 'نشط':
        return 'success';
      case 'قيد المراجعة':
        return 'warning';
      case 'مكتمل':
        return 'info';
      case 'ملغى':
        return 'danger';
      default:
        return 'info';
    }
  }

  /**
   * حساب نسبة التقدم
   */
  calculateProgress(contract: Contract): number {
    if (!contract.startDate || !contract.endDate) return 0;

    const start = new Date(contract.startDate).getTime();
    const end = new Date(contract.endDate).getTime();
    const now = Date.now();

    if (now < start) return 0;
    if (now > end) return 100;

    const total = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / total) * 100);
  }

  /**
   * الحصول على الأيام المتبقية
   */
  getDaysRemaining(endDate: Date): number {
    const end = new Date(endDate).getTime();
    const now = Date.now();
    const diff = end - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
