import { Component, Input } from '@angular/core';

/**
 * مكون الشارة (Badge)
 */
@Component({
  selector: 'app-badge',
  template: `
    <span [ngClass]="getBadgeClasses()" class="badge">
      <ng-content></ng-content>
    </span>
  `,
  styles: [],
})
export class BadgeComponent {
  @Input() variant: 'success' | 'warning' | 'danger' | 'info' | 'default' =
    'default';

  getBadgeClasses(): string {
    const variantClasses = {
      success: 'badge-success',
      warning: 'badge-warning',
      danger: 'badge-danger',
      info: 'badge-info',
      default: 'bg-gray-100 text-gray-800',
    };

    return variantClasses[this.variant];
  }
}
