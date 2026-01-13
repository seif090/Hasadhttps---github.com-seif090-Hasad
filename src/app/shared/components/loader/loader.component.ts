import { Component } from '@angular/core';

/**
 * مكون التحميل
 */
@Component({
  selector: 'app-loader',
  template: `
    <div class="flex items-center justify-center p-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
      ></div>
    </div>
  `,
  styles: [],
})
export class LoaderComponent {}
