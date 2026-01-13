/**
 * نموذج العقد
 */
export interface Contract {
  id: string;
  type: 'إيجار' | 'شراكة' | 'خدمات زراعية';
  farmerId: string;
  farmerName: string;
  companyId: string;
  companyName: string;
  landIds: string[];
  startDate: Date;
  endDate: Date;
  status: 'نشط' | 'منتهي' | 'معلق' | 'ملغي';
  terms: {
    totalAmount: number;
    paymentSchedule: 'شهري' | 'ربع سنوي' | 'نصف سنوي' | 'سنوي';
    paymentMethod: 'نقدي' | 'تحويل بنكي' | 'شيك';
    specialConditions?: string[];
  };
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedAt: Date;
  }[];
  signedByFarmer: boolean;
  signedByCompany: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * نموذج الدفعة المالية
 */
export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'معلقة' | 'مدفوعة' | 'متأخرة';
  method?: string;
  notes?: string;
}
