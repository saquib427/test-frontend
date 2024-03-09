import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAddComponent } from './containers/customer-add/customer-add.component';
import { CustomerListComponent } from './containers/customer-list/customer-list.component';

const routes: Routes = [
  {
    path: 'customer-list',
    data: { title: 'Customer List' },
    component: CustomerListComponent
  },
  {
    path: 'customer-add',
    data: { title: 'Customer Add' },
    component: CustomerAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }