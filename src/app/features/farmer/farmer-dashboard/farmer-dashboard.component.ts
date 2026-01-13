import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { LandService } from '../../../core/services/land.service';
import { ContractService } from '../../../core/services/contract.service';
import { User } from '../../../core/models/user.model';
import { Land } from '../../../core/models/land.model';
import { Contract } from '../../../core/models/contract.model';

/**
 * لوحة تحكم المزارع
 * تعرض ملخصاً شاملاً لجميع بيانات المزارع
 */
@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.scss'],
})
export class FarmerDashboardComponent implements OnInit {
  currentUser: User | null = null;
  lands: Land[] = [];
  contracts: Contract[] = [];
  stats: any = {};
  isLoading = true;

  constructor(
    private authService: AuthService,
    private landService: LandService,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadDashboardData();
    }
  }

  /**
   * تحميل بيانات لوحة التحكم
   */
  loadDashboardData(): void {
    const userId = this.currentUser?.id || '1';

    // تحميل الأراضي
    this.landService.getFarmerLands(userId).subscribe((lands) => {
      this.lands = lands;
    });

    // تحميل العقود
    this.contractService.getFarmerContracts(userId).subscribe((contracts) => {
      this.contracts = contracts;
    });

    // تحميل الإحصائيات
    this.landService.getLandStats(userId).subscribe((stats) => {
      this.stats = stats;
      this.isLoading = false;
    });
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

  /**
   * الحصول على لون حالة العقد
   */
  getContractStatusColor(
    status: string
  ): 'success' | 'warning' | 'info' | 'danger' | 'default' {
    const colors: any = {
      نشط: 'success',
      منتهي: 'default',
      معلق: 'warning',
      mlghi: 'danger',
      ملغي: 'danger',
    };
    return colors[status] || 'default';
  }
}
