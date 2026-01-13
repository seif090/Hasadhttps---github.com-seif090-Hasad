import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../core/services/company.service';
import { Block } from '../../../core/models/land.model';

/**
 * لوحة تحكم الشركات
 * تعرض الكتل الزراعية والتقارير المالية
 */
@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss'],
})
export class CompanyDashboardComponent implements OnInit {
  blocks: Block[] = [];
  loading = false;

  // Statistics
  stats = {
    totalBlocks: 0,
    totalArea: 0,
    totalInvestment: 0,
    totalRevenue: 0,
    activeContracts: 0,
    averageYield: 0,
  };

  recentBlocks: Block[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * تحميل بيانات Dashboard
   */
  loadDashboardData(): void {
    this.loading = true;

    this.companyService.getCompanyBlocks('COMP-001').subscribe({
      next: (blocks) => {
        this.blocks = blocks;
        this.calculateStats(blocks);
        this.recentBlocks = blocks.slice(0, 3);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blocks:', error);
        this.loading = false;
      },
    });
  }

  /**
   * حساب الإحصائيات
   */
  calculateStats(blocks: Block[]): void {
    this.stats.totalBlocks = blocks.length;
    this.stats.totalArea = blocks.reduce(
      (sum, block) => sum + block.totalArea,
      0
    );
    this.stats.totalInvestment = blocks.reduce(
      (sum, block) => sum + block.totalInvestment,
      0
    );
    this.stats.totalRevenue = blocks.reduce(
      (sum, block) => sum + block.expectedRevenue,
      0
    );
    this.stats.activeContracts = blocks.reduce(
      (sum, block) => sum + block.contractsCount,
      0
    );
    this.stats.averageYield =
      blocks.length > 0
        ? blocks.reduce((sum, block) => sum + block.averageYield, 0) /
          blocks.length
        : 0;
  }

  /**
   * الحصول على لون Progress
   */
  getProgressColor(percentage: number): string {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  }
}
