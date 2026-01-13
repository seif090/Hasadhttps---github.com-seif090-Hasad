import { Component } from '@angular/core';

/**
 * مكون البطاقة القابل لإعادة الاستخدام
 */
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class CardComponent {}
