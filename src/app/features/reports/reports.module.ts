import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsDashboardComponent } from './reports-dashboard/reports-dashboard.component';

/**
 * وحدة التقارير
 */
@NgModule({
  declarations: [ReportsDashboardComponent],
  imports: [SharedModule, ReportsRoutingModule],
})
export class ReportsModule {}
