import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { AuthService } from './services/auth.service';
import { LandService } from './services/land.service';
import { CompanyService } from './services/company.service';
import { ContractService } from './services/contract.service';
import { FieldTaskService } from './services/field-task.service';
import { NotificationService } from './services/notification.service';
import { LoadingService } from './services/loading.service';
import { ToastService } from './services/toast.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

/**
 * الوحدة الأساسية
 * تحتوي على الخدمات والحراس المشتركة في التطبيق
 * يتم استيرادها مرة واحدة فقط في AppModule
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    // Services
    AuthService,
    LandService,
    CompanyService,
    ContractService,
    FieldTaskService,
    NotificationService,
    LoadingService,
    ToastService,
    // Guards
    AuthGuard,
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
