/**
 * نموذج العقد
 */
export interface Contract {
  id: string;
  contractNumber?: string;
  type: 'إيجار' | 'شراكة' | 'خدمات زراعية';
  farmerId: string;
  farmerName: string;
  companyId: string;
  companyName: string;
  landIds: string[];
  landName?: string;
  startDate: Date;
  endDate: Date;
  duration?: number; // months
  status: 'نشط' | 'منتهي' | 'معلق' | 'ملغي' | 'مكتمل' | 'قيد المراجعة';
  totalValue?: number;
  paidAmount?: number;
  remainingAmount?: number;
  notes?: string;
  terms: {
    totalAmount: number;
    paymentSchedule: 'شهري' | 'ربع سنوي' | 'نصف سنوي' | 'سنوي';
    paymentMethod: 'نقدي' | 'تحويل بنكي' | 'شيك';
    specialConditions?: string[];
  };
  paymentSchedule?: {
    id: string;
    amount: number;
    dueDate: Date;
    isPaid: boolean;
    paidDate?: Date;
  }[];
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
