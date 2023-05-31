import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private _messageService: MessageService,
    private _router: Router
  ) { }

  createCustomer(customer: ICustomerForm) {
    this._customerService.createCustomer(customer)
      .subscribe({
        next: (response) => {
          this._router.navigate(['/sucesso'], { skipLocationChange: true });
          this._messageService.add({
            severity: 'success',
            summary: "Sucesso",
            detail: "Cadastrado com sucesso!"
          })
        },
        error: (response) => {
          console.error(response);
          console.error(response.error);

          this._customerService.actionSuccessful.next(false);

          this._messageService.add({
            severity: 'error',
            summary: "Falha no cadastro",
            detail: response.error.message || response.error || "Não foi possível identeficar o campo inválido."
          })
        }
      })
  }

  ngOnInit(): void {}

}
