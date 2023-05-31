import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/services/customer.service';
import { ICustomerForm } from 'src/interfaces/ICustomer';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent implements OnInit {

  constructor(
    private _customerService: CustomerService,
    private _messageService: MessageService
  ) { }

  createCustomer(customer: ICustomerForm) {
    this._customerService.createCustomer(customer)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (response) => {
          console.error(response);
          console.error(response.error);
          this._messageService.add({
            severity: 'error',
            summary: "Falha no cadastro",
            detail: response.error.message
          })
        }
      })
  }

  ngOnInit(): void {}

}
