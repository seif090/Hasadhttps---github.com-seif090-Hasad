import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../core/services/company.service';
import { ContractService } from '../../../core/services/contract.service';
import { ToastService } from '../../../core/services/toast.service';

interface ChartData {
  labels: string[];
  data: number[];
}

/**
 * لوحة التقارير
 */
@Component({
  selector: 'app-reports-dashboard',
  templateUrl: './reports-dashboard.component.html',
  styleUrls: ['./reports-dashboard.component.scss'],
})
export class ReportsDashboardComponent implements OnInit {
  loading = false;

  // Filters
  selectedPeriod = 'month'; // month, quarter, year
  selectedGovernorate = '';

  // Statistics
  stats = {
    totalRevenue: 0,
    totalContracts: 0,
    totalBlocks: 0,
    totalArea: 0,
    averageYield: 0,
    activeContracts: 0,
  };

  // Chart Data
  revenueByMonthData: ChartData = { labels: [], data: [] };
  contractsByStatusData: ChartData = { labels: [], data: [] };
  blocksByGovernorateData: ChartData = { labels: [], data: [] };
  cropDistributionData: ChartData = { labels: [], data: [] };

  // Chart Colors
  chartColors = {
    primary: '#10b981',
    secondary: '#3b82f6',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
    success: '#22c55e',
  };

  constructor(
    private companyService: CompanyService,
    private contractService: ContractService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadReportsData();
  }

  /**
   * تحميل بيانات التقارير
   */
  loadReportsData(): void {
    this.loading = true;

    // Load blocks data
    this.companyService.getCompanyBlocks('COMPANY-001').subscribe({
      next: (blocks) => {
        // Calculate stats
        this.stats.totalBlocks = blocks.length;
        this.stats.totalArea = blocks.reduce((sum, b) => sum + b.totalArea, 0);
        this.stats.totalRevenue = blocks.reduce(
          (sum, b) => sum + b.currentRevenue,
          0
        );
        this.stats.averageYield =
          blocks.length > 0
            ? blocks.reduce((sum, b) => sum + b.averageYield, 0) / blocks.length
            : 0;

        // Generate chart data
        this.generateBlocksByGovernorateChart(blocks);
        this.generateCropDistributionChart(blocks);

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading reports:', error);
        this.toastService.error('فشل تحميل التقارير');
        this.loading = false;
      },
    });

    // Load contracts data
    this.contractService.getFarmerContracts('FARMER-001').subscribe({
      next: (contracts) => {
        this.stats.totalContracts = contracts.length;
        this.stats.activeContracts = contracts.filter(
          (c) => c.status === 'نشط'
        ).length;

        this.generateContractsByStatusChart(contracts);
        this.generateRevenueByMonthChart(contracts);
      },
      error: (error) => {
        console.error('Error loading contracts:', error);
      },
    });
  }

  /**
   * توليد بيانات مخطط الإيرادات الشهرية
   */
  generateRevenueByMonthChart(contracts: any[]): void {
    const months = [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ];

    const revenueByMonth = new Array(12).fill(0);

    contracts.forEach((contract) => {
      const month = new Date(contract.startDate).getMonth();
      revenueByMonth[month] += contract.totalValue;
    });

    this.revenueByMonthData = {
      labels: months,
      data: revenueByMonth,
    };
  }

  /**
   * توليد بيانات مخطط العقود حسب الحالة
   */
  generateContractsByStatusChart(contracts: any[]): void {
    const statusCounts: any = {};

    contracts.forEach((contract) => {
      statusCounts[contract.status] = (statusCounts[contract.status] || 0) + 1;
    });

    this.contractsByStatusData = {
      labels: Object.keys(statusCounts),
      data: Object.values(statusCounts),
    };
  }

  /**
   * توليد بيانات مخطط البلوكات حسب المحافظة
   */
  generateBlocksByGovernorateChart(blocks: any[]): void {
    const governorateCounts: any = {};

    blocks.forEach((block) => {
      governorateCounts[block.governorate] =
        (governorateCounts[block.governorate] || 0) + 1;
    });

    this.blocksByGovernorateData = {
      labels: Object.keys(governorateCounts),
      data: Object.values(governorateCounts),
    };
  }

  /**
   * توليد بيانات مخطط توزيع المحاصيل
   */
  generateCropDistributionChart(blocks: any[]): void {
    const cropCounts: any = {};

    blocks.forEach((block) => {
      cropCounts[block.cropType] = (cropCounts[block.cropType] || 0) + 1;
    });

    this.cropDistributionData = {
      labels: Object.keys(cropCounts),
      data: Object.values(cropCounts),
    };
  }

  /**
   * تصدير التقرير PDF
   */
  exportPDF(): void {
    this.toastService.info('جاري تصدير التقرير...');
    // Implementation would go here
    setTimeout(() => {
      this.toastService.success('تم تصدير التقرير بنجاح');
    }, 1000);
  }

  /**
   * تصدير التقرير Excel
   */
  exportExcel(): void {
    this.toastService.info('جاري تصدير التقرير...');
    // Implementation would go here
    setTimeout(() => {
      this.toastService.success('تم تصدير التقرير بنجاح');
    }, 1000);
  }

  /**
   * تطبيق الفلاتر
   */
  applyFilters(): void {
    this.loadReportsData();
  }

  /**
   * مسح الفلاتر
   */
  clearFilters(): void {
    this.selectedPeriod = 'month';
    this.selectedGovernorate = '';
    this.loadReportsData();
  }
}
