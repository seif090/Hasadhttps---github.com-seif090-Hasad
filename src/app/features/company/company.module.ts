import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyBlocksComponent } from './company-blocks/company-blocks.component';

/**
 * وحدة الشركات
 * تحتوي على جميع الصفحات الخاصة بالشركات
 */
@NgModule({
  declarations: [CompanyDashboardComponent, CompanyBlocksComponent],
  imports: [SharedModule, CompanyRoutingModule],
})
export class CompanyModule {}
