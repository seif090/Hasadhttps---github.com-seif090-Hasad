/**
 * نموذج الكتلة الزراعية (للشركات)
 */
export interface LandBlock {
  id: string;
  companyId: string;
  companyName: string;
  name: string;
  totalArea: number; // فدان
  numberOfLands: number;
  lands: string[]; // معرفات الأراضي
  location: {
    governorate: string;
    district: string;
  };
  cropType: string;
  status: 'نشط' | 'معلق' | 'مكتمل';
  startDate: Date;
  endDate?: Date;
  totalInvestment: number;
  expectedRevenue: number;
  actualRevenue?: number;
  createdAt: Date;
}

/**
 * نموذج التقرير المالي
 */
export interface FinancialReport {
  id: string;
  blockId: string;
  period: {
    from: Date;
    to: Date;
  };
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  roi: number; // نسبة العائد على الاستثمار
  breakdown: {
    category: string;
    amount: number;
  }[];
  generatedAt: Date;
}
