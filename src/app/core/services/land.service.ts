import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Land, CropCycle, Harvest } from '../models/land.model';

/**
 * خدمة إدارة الأراضي
 * توفر جميع العمليات المتعلقة بالأراضي الزراعية
 */
@Injectable({
  providedIn: 'root',
})
export class LandService {
  // بيانات تجريبية للأراضي
  private mockLands: Land[] = [
    {
      id: '1',
      farmerId: '1',
      farmerName: 'أحمد محمد',
      area: 5,
      location: {
        governorate: 'الدقهلية',
        district: 'المنصورة',
        village: 'ميت غمر',
        coordinates: { lat: 31.0409, lng: 31.3785 },
      },
      soilType: 'طينية',
      status: 'قيد الزراعة',
      irrigationType: 'ري بالتنقيط',
      currentCrop: 'طماطم',
      contracts: ['1', '2'],
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date(),
    },
    {
      id: '2',
      farmerId: '1',
      farmerName: 'أحمد محمد',
      area: 3,
      location: {
        governorate: 'الدقهلية',
        district: 'المنصورة',
        village: 'ميت غمر',
      },
      soilType: 'طينية رملية',
      status: 'متاحة',
      irrigationType: 'ري بالرش',
      contracts: [],
      createdAt: new Date('2023-03-20'),
      updatedAt: new Date(),
    },
    {
      id: '3',
      farmerId: '1',
      farmerName: 'أحمد محمد',
      area: 7,
      location: {
        governorate: 'الشرقية',
        district: 'الزقازيق',
        village: 'أبو حماد',
      },
      soilType: 'طينية',
      status: 'مؤجرة',
      irrigationType: 'ري بالغمر',
      currentCrop: 'قمح',
      contracts: ['3'],
      createdAt: new Date('2022-11-10'),
      updatedAt: new Date(),
    },
  ];

  // بيانات تجريبية للدورات الزراعية
  private mockCropCycles: CropCycle[] = [
    {
      id: '1',
      landId: '1',
      cropType: 'طماطم',
      season: 'صيفي',
      plantingDate: new Date('2024-03-01'),
      expectedHarvestDate: new Date('2024-06-15'),
      expectedYield: 15,
      actualYield: 16.5,
      status: 'تم الحصاد',
      expenses: 25000,
      revenue: 82500,
      notes: 'موسم ممتاز',
    },
    {
      id: '2',
      landId: '1',
      cropType: 'خيار',
      season: 'شتوي',
      plantingDate: new Date('2025-01-01'),
      expectedHarvestDate: new Date('2025-04-15'),
      expectedYield: 12,
      status: 'جاري الزراعة',
      expenses: 20000,
    },
    {
      id: '3',
      landId: '3',
      cropType: 'قمح',
      season: 'شتوي',
      plantingDate: new Date('2024-11-15'),
      expectedHarvestDate: new Date('2025-05-01'),
      expectedYield: 21,
      status: 'جاهز للحصاد',
      expenses: 35000,
    },
  ];

  // بيانات تجريبية للحصاد
  private mockHarvests: Harvest[] = [
    {
      id: '1',
      cropCycleId: '1',
      landId: '1',
      date: new Date('2024-06-15'),
      quantity: 16.5,
      quality: 'ممتاز',
      price: 5000,
      totalRevenue: 82500,
      buyer: 'شركة الخير الزراعية',
      notes: 'تم التسليم كاملاً',
    },
  ];

  constructor() {}

  /**
   * الحصول على جميع الأراضي للمزارع
   */
  getFarmerLands(farmerId: string): Observable<Land[]> {
    const lands = this.mockLands.filter((land) => land.farmerId === farmerId);
    return of(lands).pipe(delay(500));
  }

  /**
   * الحصول على تفاصيل أرض محددة
   */
  getLandById(landId: string): Observable<Land | undefined> {
    const land = this.mockLands.find((l) => l.id === landId);
    return of(land).pipe(delay(300));
  }

  /**
   * الحصول على الدورات الزراعية لأرض
   */
  getCropCyclesByLand(landId: string): Observable<CropCycle[]> {
    const cycles = this.mockCropCycles.filter((c) => c.landId === landId);
    return of(cycles).pipe(delay(400));
  }

  /**
   * الحصول على بيانات الحصاد لأرض
   */
  getHarvestsByLand(landId: string): Observable<Harvest[]> {
    const harvests = this.mockHarvests.filter((h) => h.landId === landId);
    return of(harvests).pipe(delay(400));
  }

  /**
   * الحصول على إحصائيات الأراضي
   */
  getLandStats(farmerId: string): Observable<any> {
    const lands = this.mockLands.filter((land) => land.farmerId === farmerId);
    const totalArea = lands.reduce((sum, land) => sum + land.area, 0);
    const activeLands = lands.filter(
      (land) => land.status === 'قيد الزراعة' || land.status === 'مؤجرة'
    ).length;

    return of({
      totalLands: lands.length,
      totalArea: totalArea,
      activeLands: activeLands,
      availableLands: lands.filter((land) => land.status === 'متاحة').length,
    }).pipe(delay(300));
  }
}
