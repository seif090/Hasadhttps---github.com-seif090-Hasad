import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { FarmerLandsComponent } from './farmer-lands/farmer-lands.component';
import { LandDetailComponent } from './land-detail/land-detail.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: FarmerDashboardComponent,
  },
  {
    path: 'lands',
    component: FarmerLandsComponent,
  },
  {
    path: 'lands/:id',
    component: LandDetailComponent,
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
export class FarmerRoutingModule {}
