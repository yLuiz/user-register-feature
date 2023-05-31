import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICustomerForm } from 'src/interfaces/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private _http: HttpClient
  ) { }

  createCustomer(customer: ICustomerForm) {

    console.log(customer.gender)

    return this._http.post(`${environment.API_URL}/users`, customer);
  }
}
