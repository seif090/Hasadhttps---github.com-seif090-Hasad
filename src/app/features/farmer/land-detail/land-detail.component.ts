import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandService } from '../../../core/services/land.service';
import { ContractService } from '../../../core/services/contract.service';
import { Land, CropCycle, Harvest } from '../../../core/models/land.model';
import { Contract } from '../../../core/models/contract.model';

/**
 * صفحة تفاصيل الأرض
 * تعرض معلومات تفصيلية عن أرض محددة
 */
@Component({
  selector: 'app-land-detail',
  templateUrl: './land-detail.component.html',
  styleUrls: ['./land-detail.component.scss'],
})
export class LandDetailComponent implements OnInit {
  land?: Land;
  cropCycles: CropCycle[] = [];
  harvests: Harvest[] = [];
  contracts: Contract[] = [];
  isLoading = true;
  activeTab = 'details';

  constructor(
    private route: ActivatedRoute,
    private landService: LandService,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    const landId = this.route.snapshot.paramMap.get('id');
    if (landId) {
      this.loadLandData(landId);
    }
  }

  /**
   * تحميل بيانات الأرض
   */
  loadLandData(landId: string): void {
    // تحميل تفاصيل الأرض
    this.landService.getLandById(landId).subscribe((land) => {
      this.land = land;
      this.isLoading = false;
    });

    // تحميل الدورات الزراعية
    this.landService.getCropCyclesByLand(landId).subscribe((cycles) => {
      this.cropCycles = cycles;
    });

    // تحميل بيانات الحصاد
    this.landService.getHarvestsByLand(landId).subscribe((harvests) => {
      this.harvests = harvests;
    });

    // تحميل العقود (إذا كانت موجودة)
    this.contractService.getAllContracts().subscribe((allContracts) => {
      if (this.land) {
        this.contracts = allContracts.filter((c) => c.landIds.includes(landId));
      }
    });
  }

  /**
   * تغيير التبويب النشط
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  /**
   * الحصول على لون حالة الدورة الزراعية
   */
  getCycleStatusColor(
    status: string
  ): 'success' | 'warning' | 'info' | 'danger' | 'default' {
    const colors: any = {
      مخطط: 'info',
      'جاري الزراعة': 'warning',
      'جاهز للحصاد': 'success',
      'تم الحصاد': 'default',
    };
    return colors[status] || 'default';
  }

  /**
   * الحصول على لون جودة الحصاد
   */
  getQualityColor(
    quality: string
  ): 'success' | 'warning' | 'info' | 'danger' | 'default' {
    const colors: any = {
      ممتاز: 'success',
      جيد: 'info',
      متوسط: 'warning',
    };
    return colors[quality] || 'default';
  }
}
