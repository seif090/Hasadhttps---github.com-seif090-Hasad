import { Pipe, PipeTransform } from '@angular/core';

/**
 * Arabic Date Pipe
 * تحويل التاريخ إلى صيغة عربية
 */
@Pipe({
  name: 'arabicDate',
})
export class ArabicDatePipe implements PipeTransform {
  private arabicMonths = [
    'يناير',
    'فبراير',
    'مارس',
    'إبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];

  private arabicDays = [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ];

  transform(
    value: Date | string | null,
    format: 'short' | 'medium' | 'long' = 'medium'
  ): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;

    if (isNaN(date.getTime())) return '';

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dayName = this.arabicDays[date.getDay()];
    const monthName = this.arabicMonths[month];

    switch (format) {
      case 'short':
        return `${day}/${month + 1}/${year}`;
      case 'medium':
        return `${day} ${monthName} ${year}`;
      case 'long':
        return `${dayName}، ${day} ${monthName} ${year}`;
      default:
        return `${day} ${monthName} ${year}`;
    }
  }
}
