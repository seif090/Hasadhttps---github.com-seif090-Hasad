import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FarmerRoutingModule } from './farmer-routing.module';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { FarmerLandsComponent } from './farmer-lands/farmer-lands.component';
import { LandDetailComponent } from './land-detail/land-detail.component';
import { FarmerLayoutComponent } from './farmer-layout/farmer-layout.component';

/**
 * وحدة المزارع
 * تحتوي على جميع الصفحات الخاصة بالمزارع
 */
@NgModule({
  declarations: [
    FarmerDashboardComponent,
    FarmerLandsComponent,
    LandDetailComponent,
    FarmerLayoutComponent,
  ],
  imports: [SharedModule, FarmerRoutingModule],
})
export class FarmerModule {}
