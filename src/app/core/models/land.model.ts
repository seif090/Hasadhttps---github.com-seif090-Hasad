/**
 * نموذج الأرض الزراعية
 */
export interface Land {
  id: string;
  farmerId: string;
  farmerName: string;
  area: number; // بالفدان
  location: {
    governorate: string;
    district: string;
    village: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  soilType: 'طينية' | 'رملية' | 'طينية رملية' | 'صفراء';
  status: 'متاحة' | 'مؤجرة' | 'قيد الزراعة' | 'تحت الصيانة';
  irrigationType: 'ري بالغمر' | 'ري بالرش' | 'ري بالتنقيط';
  currentCrop?: string;
  contracts: string[]; // معرفات العقود
  createdAt: Date;
  updatedAt: Date;
}

/**
 * نموذج الدورة الزراعية
 */
export interface CropCycle {
  id: string;
  landId: string;
  cropType: string;
  season: 'صيفي' | 'شتوي' | 'نيلي';
  plantingDate: Date;
  expectedHarvestDate: Date;
  actualHarvestDate?: Date;
  expectedYield: number; // طن
  actualYield?: number; // طن
  status: 'مخطط' | 'جاري الزراعة' | 'جاهز للحصاد' | 'تم الحصاد';
  expenses: number;
  revenue?: number;
  notes?: string;
}

/**
 * نموذج الحصاد
 */
export interface Harvest {
  id: string;
  cropCycleId: string;
  landId: string;
  date: Date;
  quantity: number; // طن
  quality: 'ممتاز' | 'جيد' | 'متوسط';
  price: number; // جنيه للطن
  totalRevenue: number;
  buyer?: string;
  notes?: string;
}
