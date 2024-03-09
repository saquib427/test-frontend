import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzDrawerRef } from "ng-zorro-antd/drawer"
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  @Input() id: any;

  customerDetails = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.maxLength(50)]],
    age: [null, [Validators.required]],
    postCode: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/),]],
    height: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef<any>,
    private notification: NzNotificationService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    if (this.id !== undefined) {
      this.getCustomerById();
    }
  }

  getCustomerById() {
    this.customerService.getCustomerById(this.id).subscribe((result: any) => {
      if (result) {
        let data = result;

        this.customerDetails.patchValue({
          id: this.id,
          name: data.name,
          age: data.age,
          postCode: data.postCode,
          height: data.height
        });
      } else {
        this.notification.create('error', 'Error', 'Unable to get customer. Please try again.');
      }
    });
  }

  submitCustomerDetails() {
    if (this.id !== undefined) {
      this.updateCustomer();
    } else {
      this.addCustomer();
    }
  }

  addCustomer() {
    if (this.customerDetails.invalid) {
      this.markFormGroupTouched(this.customerDetails);
      this.notification.create('error', 'Error', 'Please check the validations and try again.');
      return;
    }

    let formData = new FormData();

    let data: any = this.customerDetails.value;
    for (let key in data) {
      if (key != "id") {
        formData.append(`${key}`, `${data[key]}`);
      }
    }

    this.customerService.postCustomerForm(formData).subscribe((result) => {
      if (result) {
        this.drawerRef.close(result);
      } else {
        this.notification.create('error', 'Error', 'Unable to add customer. Please check and try again.');
      }
    });
  }

  updateCustomer() {
    if (this.customerDetails.invalid) {
      this.markFormGroupTouched(this.customerDetails);
      this.notification.create('error', 'Error', 'Please check the validations and try again.');
      return;
    }

    let formData = new FormData();

    let data: any = this.customerDetails.value;

    for (let key in data) {
      formData.append(`${key}`, `${data[key]}`);
    }

    this.customerService.updateCustomerForm(formData).subscribe((result) => {
      if (result) {
        this.drawerRef.close(result);
      } else {
        this.notification.create('error', 'Error', 'Unable to add customer. Please check and try again.');
      }
    });
  }

  onCancel() {
    this.drawerRef.close(undefined);
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
