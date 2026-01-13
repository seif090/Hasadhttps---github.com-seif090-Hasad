import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CompanyRoutingModule } from './company-routing.module';

/**
 * وحدة الشركات
 * تحتوي على جميع الصفحات الخاصة بالشركات
 */
@NgModule({
  declarations: [],
  imports: [SharedModule, CompanyRoutingModule],
})
export class CompanyModule {}
