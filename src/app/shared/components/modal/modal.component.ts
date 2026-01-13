import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * مكون النافذة المنبثقة
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [],
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
