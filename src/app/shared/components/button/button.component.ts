import { Component, Input } from '@angular/core';

/**
 * مكون الزر القابل لإعادة الاستخدام
 */
@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="getButtonClasses()"
      class="transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;

  getButtonClasses(): string {
    const baseClasses =
      'font-medium rounded-lg focus:ring-2 focus:outline-none';

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    };

    const variantClasses = {
      primary:
        'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-300',
      secondary:
        'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-300',
      success:
        'bg-green-600 hover:bg-green-700 text-white focus:ring-green-300',
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${
      variantClasses[this.variant]
    }`;
  }
}
