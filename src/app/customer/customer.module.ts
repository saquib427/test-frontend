import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './containers/customer-list/customer-list.component';
import { CustomerAddComponent } from './containers/customer-add/customer-add.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './customer.service';
import { AntdModule } from '../ng-zorro-antd.module';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerAddComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AntdModule
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
