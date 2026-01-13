import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../core/services/company.service';
import { Block } from '../../../core/models/land.model';

/**
 * صفحة الكتل الزراعية
 */
@Component({
  selector: 'app-company-blocks',
  templateUrl: './company-blocks.component.html',
  styleUrls: ['./company-blocks.component.scss'],
})
export class CompanyBlocksComponent implements OnInit {
  blocks: Block[] = [];
  filteredBlocks: Block[] = [];
  loading = false;

  // Filters
  searchTerm = '';
  selectedGovernorate = '';
  selectedStatus = '';

  governorates: string[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadBlocks();
  }

  /**
   * تحميل الكتل الزراعية
   */
  loadBlocks(): void {
    this.loading = true;

    this.companyService.getCompanyBlocks('COMP-001').subscribe({
      next: (blocks) => {
        this.blocks = blocks;
        this.filteredBlocks = blocks;
        this.governorates = [...new Set(blocks.map((b) => b.governorate))];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blocks:', error);
        this.loading = false;
      },
    });
  }

  /**
   * تطبيق الفلاتر
   */
  applyFilters(): void {
    this.filteredBlocks = this.blocks.filter((block) => {
      const matchesSearch =
        !this.searchTerm ||
        block.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        block.location.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesGovernorate =
        !this.selectedGovernorate ||
        block.governorate === this.selectedGovernorate;

      return matchesSearch && matchesGovernorate;
    });
  }

  /**
   * مسح الفلاتر
   */
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedGovernorate = '';
    this.selectedStatus = '';
    this.filteredBlocks = this.blocks;
  }

  /**
   * الحصول على لون الحالة
   */
  getStatusColor(percentage: number): string {
    if (percentage >= 75) return 'success';
    if (percentage >= 50) return 'warning';
    return 'danger';
  }

  /**
   * الحصول على نص الحالة
   */
  getStatusText(percentage: number): string {
    if (percentage >= 75) return 'متقدم';
    if (percentage >= 50) return 'في التقدم';
    if (percentage > 0) return 'بدأ';
    return 'جديد';
  }
}
