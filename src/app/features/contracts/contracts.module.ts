import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsListComponent } from './contracts-list/contracts-list.component';

/**
 * وحدة العقود
 */
@NgModule({
  declarations: [ContractsListComponent],
  imports: [SharedModule, ContractsRoutingModule],
})
export class ContractsModule {}
