import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyBlocksComponent } from './company-blocks/company-blocks.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CompanyDashboardComponent,
  },
  {
    path: 'blocks',
    component: CompanyBlocksComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
