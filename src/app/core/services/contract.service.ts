import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Contract, Payment } from '../models/contract.model';

/**
 * خدمة إدارة العقود
 * توفر جميع العمليات المتعلقة بالعقود والدفعات
 */
@Injectable({
  providedIn: 'root',
})
export class ContractService {
  // بيانات تجريبية للعقود
  private mockContracts: Contract[] = [
    {
      id: '1',
      type: 'إيجار',
      farmerId: '1',
      farmerName: 'أحمد محمد',
      companyId: 'c1',
      companyName: 'شركة الخير الزراعية',
      landIds: ['1'],
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'نشط',
      terms: {
        totalAmount: 50000,
        paymentSchedule: 'ربع سنوي',
        paymentMethod: 'تحويل بنكي',
        specialConditions: [
          'الشركة مسؤولة عن جميع تكاليف الزراعة',
          'المزارع يحصل على 30% من الأرباح الإضافية',
        ],
      },
      documents: [
        {
          id: 'd1',
          name: 'عقد الإيجار الأساسي',
          type: 'pdf',
          url: '/documents/contract-1.pdf',
          uploadedAt: new Date('2024-01-01'),
        },
      ],
      signedByFarmer: true,
      signedByCompany: true,
      createdAt: new Date('2023-12-15'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      type: 'شراكة',
      farmerId: '1',
      farmerName: 'أحمد محمد',
      companyId: 'c2',
      companyName: 'شركة InomTech للزراعة الذكية',
      landIds: ['1', '2'],
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-05-31'),
      status: 'نشط',
      terms: {
        totalAmount: 120000,
        paymentSchedule: 'شهري',
        paymentMethod: 'نقدي',
        specialConditions: [
          'تقاسم الأرباح 50/50',
          'الشركة توفر البذور والأسمدة',
        ],
      },
      documents: [],
      signedByFarmer: true,
      signedByCompany: true,
      createdAt: new Date('2024-05-10'),
      updatedAt: new Date('2024-06-01'),
    },
    {
      id: '3',
      type: 'خدمات زراعية',
      farmerId: '1',
      farmerName: 'أحمد محمد',
      companyId: 'c3',
      companyName: 'شركة النهضة للخدمات الزراعية',
      landIds: ['3'],
      startDate: new Date('2024-11-01'),
      endDate: new Date('2025-04-30'),
      status: 'نشط',
      terms: {
        totalAmount: 35000,
        paymentSchedule: 'نصف سنوي',
        paymentMethod: 'شيك',
      },
      documents: [],
      signedByFarmer: true,
      signedByCompany: false,
      createdAt: new Date('2024-10-20'),
      updatedAt: new Date('2024-11-01'),
    },
  ];

  // بيانات تجريبية للدفعات
  private mockPayments: Payment[] = [
    {
      id: 'p1',
      contractId: '1',
      amount: 12500,
      dueDate: new Date('2024-03-31'),
      paidDate: new Date('2024-03-30'),
      status: 'مدفوعة',
      method: 'تحويل بنكي',
    },
    {
      id: 'p2',
      contractId: '1',
      amount: 12500,
      dueDate: new Date('2024-06-30'),
      paidDate: new Date('2024-06-28'),
      status: 'مدفوعة',
      method: 'تحويل بنكي',
    },
    {
      id: 'p3',
      contractId: '1',
      amount: 12500,
      dueDate: new Date('2024-09-30'),
      status: 'معلقة',
    },
    {
      id: 'p4',
      contractId: '2',
      amount: 10000,
      dueDate: new Date('2025-01-01'),
      status: 'معلقة',
    },
  ];

  constructor() {}

  /**
   * الحصول على جميع العقود
   */
  getAllContracts(): Observable<Contract[]> {
    return of(this.mockContracts).pipe(delay(500));
  }

  /**
   * الحصول على عقود المزارع
   */
  getFarmerContracts(farmerId: string): Observable<Contract[]> {
    const contracts = this.mockContracts.filter((c) => c.farmerId === farmerId);
    return of(contracts).pipe(delay(500));
  }

  /**
   * الحصول على عقود الشركة
   */
  getCompanyContracts(companyId: string): Observable<Contract[]> {
    const contracts = this.mockContracts.filter(
      (c) => c.companyId === companyId
    );
    return of(contracts).pipe(delay(500));
  }

  /**
   * الحصول على تفاصيل عقد
   */
  getContractById(contractId: string): Observable<Contract | undefined> {
    const contract = this.mockContracts.find((c) => c.id === contractId);
    return of(contract).pipe(delay(300));
  }

  /**
   * الحصول على الدفعات الخاصة بعقد
   */
  getContractPayments(contractId: string): Observable<Payment[]> {
    const payments = this.mockPayments.filter(
      (p) => p.contractId === contractId
    );
    return of(payments).pipe(delay(400));
  }

  /**
   * تنزيل عقد PDF (محاكاة)
   */
  downloadContractPDF(contractId: string): Observable<Blob> {
    // محاكاة تنزيل ملف PDF
    console.log('تنزيل عقد رقم:', contractId);
    return of(new Blob(['Mock PDF Content'], { type: 'application/pdf' })).pipe(
      delay(1000)
    );
  }
}
