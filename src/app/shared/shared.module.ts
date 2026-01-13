import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ToastComponent } from './components/toast/toast.component';
import { NetworkStatusComponent } from './components/network-status/network-status.component';

// Pipes
import { ArabicDatePipe } from './pipes/arabic-date.pipe';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

// Directives
import { NumberOnlyDirective } from './directives/number-only.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

/**
 * الوحدة المشتركة
 * تحتوي على المكونات المشتركة التي تستخدم في جميع أنحاء التطبيق
 */
@NgModule({
  declarations: [
    // Components
    SidebarComponent,
    TopbarComponent,
    CardComponent,
    ButtonComponent,
    LoaderComponent,
    ModalComponent,
    BadgeComponent,
    ToastComponent,
    NetworkStatusComponent,
    // Pipes
    ArabicDatePipe,
    RelativeTimePipe,
    FileSizePipe,
    SafeHtmlPipe,
    // Directives
    NumberOnlyDirective,
    AutoFocusDirective,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Components
    SidebarComponent,
    TopbarComponent,
    CardComponent,
    ButtonComponent,
    LoaderComponent,
    ModalComponent,
    BadgeComponent,
    NetworkStatusComponent,
    ToastComponent,
    // Pipes
    ArabicDatePipe,
    RelativeTimePipe,
    FileSizePipe,
    SafeHtmlPipe,
    // Directives
    NumberOnlyDirective,
    AutoFocusDirective,
    ClickOutsideDirective,
  ],
})
export class SharedModule {}
