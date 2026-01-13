import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LandBlock, FinancialReport } from '../models/company.model';

/**
 * خدمة إدارة الشركات
 * توفر جميع العمليات المتعلقة بالشركات والكتل الزراعية
 */
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  // بيانات تجريبية للكتل الزراعية
  private mockBlocks: LandBlock[] = [
    {
      id: 'b1',
      companyId: 'c1',
      companyName: 'شركة الخير الزراعية',
      name: 'كتلة المنصورة الزراعية',
      totalArea: 50,
      numberOfLands: 10,
      lands: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      location: {
        governorate: 'الدقهلية',
        district: 'المنصورة',
      },
      cropType: 'طماطم',
      status: 'نشط',
      startDate: new Date('2024-01-01'),
      totalInvestment: 500000,
      expectedRevenue: 750000,
      actualRevenue: 680000,
      createdAt: new Date('2023-12-01'),
    },
    {
      id: 'b2',
      companyId: 'c1',
      companyName: 'شركة الخير الزراعية',
      name: 'كتلة الشرقية للقمح',
      totalArea: 75,
      numberOfLands: 15,
      lands: ['11', '12', '13', '14', '15'],
      location: {
        governorate: 'الشرقية',
        district: 'الزقازيق',
      },
      cropType: 'قمح',
      status: 'نشط',
      startDate: new Date('2024-11-01'),
      endDate: new Date('2025-05-01'),
      totalInvestment: 600000,
      expectedRevenue: 900000,
      createdAt: new Date('2024-10-15'),
    },
    {
      id: 'b3',
      companyId: 'c1',
      companyName: 'شركة الخير الزراعية',
      name: 'كتلة البحيرة للذرة',
      totalArea: 40,
      numberOfLands: 8,
      lands: ['16', '17', '18'],
      location: {
        governorate: 'البحيرة',
        district: 'دمنهور',
      },
      cropType: 'ذرة',
      status: 'مكتمل',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-08-30'),
      totalInvestment: 350000,
      expectedRevenue: 520000,
      actualRevenue: 540000,
      createdAt: new Date('2024-02-10'),
    },
  ];

  // بيانات تجريبية للتقارير المالية
  private mockReports: FinancialReport[] = [
    {
      id: 'r1',
      blockId: 'b1',
      period: {
        from: new Date('2024-01-01'),
        to: new Date('2024-06-30'),
      },
      totalRevenue: 680000,
      totalExpenses: 500000,
      profit: 180000,
      roi: 36,
      breakdown: [
        { category: 'بيع المحاصيل', amount: 680000 },
        { category: 'تكاليف البذور', amount: 80000 },
        { category: 'تكاليف الأسمدة', amount: 120000 },
        { category: 'تكاليف العمالة', amount: 150000 },
        { category: 'تكاليف الري', amount: 70000 },
        { category: 'تكاليف أخرى', amount: 80000 },
      ],
      generatedAt: new Date('2024-07-01'),
    },
    {
      id: 'r2',
      blockId: 'b3',
      period: {
        from: new Date('2024-03-01'),
        to: new Date('2024-08-30'),
      },
      totalRevenue: 540000,
      totalExpenses: 350000,
      profit: 190000,
      roi: 54.3,
      breakdown: [
        { category: 'بيع المحاصيل', amount: 540000 },
        { category: 'تكاليف البذور', amount: 50000 },
        { category: 'تكاليف الأسمدة', amount: 80000 },
        { category: 'تكاليف العمالة', amount: 120000 },
        { category: 'تكاليف الري', amount: 50000 },
        { category: 'تكاليف أخرى', amount: 50000 },
      ],
      generatedAt: new Date('2024-09-01'),
    },
  ];

  constructor() {}

  /**
   * الحصول على جميع الكتل الزراعية للشركة
   */
  getCompanyBlocks(companyId: string): Observable<LandBlock[]> {
    const blocks = this.mockBlocks.filter(
      (block) => block.companyId === companyId
    );
    return of(blocks).pipe(delay(500));
  }

  /**
   * الحصول على تفاصيل كتلة زراعية
   */
  getBlockById(blockId: string): Observable<LandBlock | undefined> {
    const block = this.mockBlocks.find((b) => b.id === blockId);
    return of(block).pipe(delay(300));
  }

  /**
   * الحصول على التقارير المالية لكتلة
   */
  getBlockFinancialReports(blockId: string): Observable<FinancialReport[]> {
    const reports = this.mockReports.filter((r) => r.blockId === blockId);
    return of(reports).pipe(delay(400));
  }

  /**
   * الحصول على إحصائيات الشركة
   */
  getCompanyStats(companyId: string): Observable<any> {
    const blocks = this.mockBlocks.filter(
      (block) => block.companyId === companyId
    );
    const totalArea = blocks.reduce((sum, block) => sum + block.totalArea, 0);
    const totalInvestment = blocks.reduce(
      (sum, block) => sum + block.totalInvestment,
      0
    );
    const totalRevenue = blocks.reduce(
      (sum, block) => sum + (block.actualRevenue || 0),
      0
    );

    return of({
      totalBlocks: blocks.length,
      activeBlocks: blocks.filter((b) => b.status === 'نشط').length,
      totalArea: totalArea,
      totalInvestment: totalInvestment,
      totalRevenue: totalRevenue,
      totalProfit: totalRevenue - totalInvestment,
    }).pipe(delay(300));
  }

  /**
   * الحصول على بيانات الإنتاجية (للرسوم البيانية)
   */
  getProductivityData(companyId: string): Observable<any> {
    return of({
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      revenue: [80000, 95000, 110000, 125000, 135000, 150000],
      expenses: [60000, 70000, 75000, 80000, 85000, 90000],
      profit: [20000, 25000, 35000, 45000, 50000, 60000],
    }).pipe(delay(400));
  }
}
