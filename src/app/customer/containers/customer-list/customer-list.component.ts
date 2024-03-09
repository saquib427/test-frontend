import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from "ng-zorro-antd/drawer"
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerService } from '../../customer.service';

interface Person {
  key: string;
  name: string;
  age: number;
  postCode: string;
  height: string;
}


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit  {
  listOfData: any[] = [];

  constructor(
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private customerService: CustomerService
  ) { }

  ngOnInit(){
    this.getCustomerList();
  }

  getCustomerList() {
    this.customerService.getCustomerList().subscribe((result: any) => {
      if(result){
        this.listOfData = result;
      }else{
        this.notification.create('error', 'Error', 'Unable to get customer list. Please try again.');
      }
    });

  }

  onAddCustomer() {
    const drawerRef = this.drawerService.create<
      CustomerAddComponent,
      {
        name: string;
        age: number;
        postCode: string;
        height: number;
      },
      any
    >({
      nzMaskClosable: false,
      nzTitle: "Add Customer",
      nzContent: CustomerAddComponent,
      nzContentParams: { },
      nzWidth: "800px",
    });

    drawerRef.afterClose.subscribe((data) => {
      if (data != undefined) {
        this.getCustomerList();
        this.notification.success("Success", "Record added successfully.");
      }
    });
  }

  onEdit(item: any) {
    const drawerRef = this.drawerService.create<
      CustomerAddComponent,
      {
        id: number;
      },
      any
    >({
      nzMaskClosable: false,
      nzTitle: "Edit Customer Details",
      nzContent: CustomerAddComponent,
      nzContentParams: {
        id: item.id,
      },
      nzWidth: "800px",
    });

    drawerRef.afterClose.subscribe((data) => {
      if (data != undefined) {
        this.getCustomerList();
        this.notification.success("Success", "Record updated successfully.");
      }
    });
  }
}
