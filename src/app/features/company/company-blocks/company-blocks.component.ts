import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../core/services/company.service';
import { LandBlock } from '../../../core/models/company.model';

/**
 * صفحة الكتل الزراعية
 */
@Component({
  selector: 'app-company-blocks',
  templateUrl: './company-blocks.component.html',
  styleUrls: ['./company-blocks.component.scss'],
})
export class CompanyBlocksComponent implements OnInit {
  blocks: LandBlock[] = [];
  filteredBlocks: LandBlock[] = [];
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
        this.governorates = [
          ...new Set(blocks.map((b) => b.location.governorate)),
        ];
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
      const matchSearch =
        this.searchTerm === '' ||
        block.name.includes(this.searchTerm) ||
        block.location.governorate.includes(this.searchTerm);

      const matchGovernorate =
        this.selectedGovernorate === '' ||
        block.location.governorate === this.selectedGovernorate;

      const matchStatus =
        this.selectedStatus === '' || block.status === this.selectedStatus;

      return matchSearch && matchGovernorate && matchStatus;
    });
  }

  getFilteredTotalArea(): number {
    return this.filteredBlocks.reduce((sum, b) => sum + b.totalArea, 0);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedGovernorate = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  getStatusColor(
    status: string
  ): 'success' | 'warning' | 'info' | 'danger' | 'default' {
    switch (status) {
      case 'نشط':
        return 'success';
      case 'معلق':
        return 'warning';
      case 'مكتمل':
        return 'info';
      default:
        return 'default';
    }
  }
}
