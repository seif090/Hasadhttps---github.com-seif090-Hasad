import { Pipe, PipeTransform } from '@angular/core';

/**
 * Relative Time Pipe
 * تحويل التاريخ إلى وقت نسبي (منذ ساعة، منذ يومين، إلخ)
 */
@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;

    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) {
      return 'منذ لحظات';
    } else if (diffMinutes < 60) {
      return diffMinutes === 1 ? 'منذ دقيقة' : `منذ ${diffMinutes} دقيقة`;
    } else if (diffHours < 24) {
      return diffHours === 1 ? 'منذ ساعة' : `منذ ${diffHours} ساعة`;
    } else if (diffDays < 7) {
      return diffDays === 1 ? 'منذ يوم' : `منذ ${diffDays} أيام`;
    } else if (diffWeeks < 4) {
      return diffWeeks === 1 ? 'منذ أسبوع' : `منذ ${diffWeeks} أسابيع`;
    } else if (diffMonths < 12) {
      return diffMonths === 1 ? 'منذ شهر' : `منذ ${diffMonths} شهور`;
    } else {
      return diffYears === 1 ? 'منذ سنة' : `منذ ${diffYears} سنوات`;
    }
  }
}
