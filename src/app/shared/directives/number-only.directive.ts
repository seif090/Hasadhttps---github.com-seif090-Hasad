import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Number Only Directive
 * يسمح فقط بإدخال الأرقام في حقل الإدخال
 */
@Directive({
  selector: '[appNumberOnly]',
})
export class NumberOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;

    // إزالة أي شيء ليس رقماً
    input.value = value.replace(/[^0-9]/g, '');

    // إطلاق حدث input إذا تغيرت القيمة
    if (value !== input.value) {
      input.dispatchEvent(new Event('input'));
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // السماح بمفاتيح التحكم
    const controlKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];

    if (controlKeys.includes(event.key)) {
      return;
    }

    // السماح بـ Ctrl/Cmd + A, C, V, X
    if (
      (event.ctrlKey || event.metaKey) &&
      ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())
    ) {
      return;
    }

    // منع أي شيء ليس رقماً
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const numbersOnly = pastedData.replace(/[^0-9]/g, '');

    const input = this.el.nativeElement as HTMLInputElement;
    document.execCommand('insertText', false, numbersOnly);
  }
}
