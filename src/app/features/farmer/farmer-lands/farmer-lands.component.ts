import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandService } from '../../../core/services/land.service';
import { AuthService } from '../../../core/services/auth.service';
import { Land } from '../../../core/models/land.model';

/**
 * صفحة قائمة الأراضي للمزارع
 */
@Component({
  selector: 'app-farmer-lands',
  templateUrl: './farmer-lands.component.html',
  styleUrls: ['./farmer-lands.component.scss'],
})
export class FarmerLandsComponent implements OnInit {
  lands: Land[] = [];
  filteredLands: Land[] = [];
  isLoading = true;
  searchTerm = '';
  selectedStatus = 'all';

  statusOptions = [
    { value: 'all', label: 'الكل' },
    { value: 'متاحة', label: 'متاحة' },
    { value: 'مؤجرة', label: 'مؤجرة' },
    { value: 'قيد الزراعة', label: 'قيد الزراعة' },
    { value: 'تحت الصيانة', label: 'تحت الصيانة' },
  ];

  constructor(
    private landService: LandService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLands();
  }

  /**
   * تحميل الأراضي
   */
  loadLands(): void {
    const userId = this.authService.getCurrentUser()?.id || '1';
    this.landService.getFarmerLands(userId).subscribe((lands) => {
      this.lands = lands;
      this.filteredLands = lands;
      this.isLoading = false;
    });
  }

  /**
   * البحث والفلترة
   */
  applyFilters(): void {
    let result = this.lands;

    // فلترة حسب الحالة
    if (this.selectedStatus !== 'all') {
      result = result.filter((land) => land.status === this.selectedStatus);
    }

    // فلترة حسب البحث
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(
        (land) =>
          land.location.governorate.toLowerCase().includes(term) ||
          land.location.district.toLowerCase().includes(term) ||
          land.location.village.toLowerCase().includes(term) ||
          land.soilType.toLowerCase().includes(term) ||
          (land.currentCrop && land.currentCrop.toLowerCase().includes(term))
      );
    }

    this.filteredLands = result;
  }

  /**
   * عرض تفاصيل الأرض
   */
  viewLandDetails(landId: string): void {
    this.router.navigate(['/farmer/lands', landId]);
  }

  /**
   * الحصول على لون حالة الأرض
   */
  getLandStatusColor(
    status: string
  ): 'success' | 'warning' | 'info' | 'danger' | 'default' {
    const colors: any = {
      متاحة: 'success',
      مؤجرة: 'info',
      'قيد الزراعة': 'warning',
      'تحت الصيانة': 'danger',
    };
    return colors[status] || 'default';
  }

  get filteredTotalArea(): number {
    return this.filteredLands.reduce((sum, land) => sum + land.area, 0);
  }
}
