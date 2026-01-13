import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./company-dashboard/company-dashboard.component').then(
        (m) => m.CompanyDashboardComponent
      ),
  },
  {
    path: 'blocks',
    loadChildren: () =>
      import('./company-blocks/company-blocks.component').then(
        (m) => m.CompanyBlocksComponent
      ),
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
