import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

/**
 * Auto Focus Directive
 * تلقائياً يضع التركيز على العنصر عند تحميل الصفحة
 */
@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  @Input() appAutoFocus: boolean = true;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.appAutoFocus) {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 100);
    }
  }
}
