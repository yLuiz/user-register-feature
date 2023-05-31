import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICustomerForm } from 'src/interfaces/ICustomer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customerForm!: FormGroup;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  genderOptions = [
    { name: "Masculino", code: "masculine" },
    { name: "Feminino", code: "feminine" },
    { name: "Outro", code: "other" },
  ]

  showBirthdateValue() {
    const birthdate = this.customerForm.get('birthdate')?.value;
    console.log(birthdate);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    console.log(this.gender?.value.code)

    let customerBirthdate = this.birthdate?.value.split("/");
    customerBirthdate = [customerBirthdate[2], customerBirthdate[1], customerBirthdate[0]].join("-") + "T12:00:00.000Z"; // Para deixar o dia precisamente exato ao que foi digitado.

    if (this.customerForm.invalid) {
      console.log("formulário inválido")
      return;
    }

    
    const customerSerialized = {
      name: this.name?.value,
      birthdate: new Date(customerBirthdate),
      cpf: this.cpf?.value,
      gender: this.gender?.value.code,
      phone: this.phone?.value,
      email: this.email?.value,
      password: this.password?.value,
      confirmPassword: this.confirmPassword?.value,
      address: {
        cep: this.cep?.value,
        city: this.city?.value,
        identification: this.identification?.value,
        neighborhood: this.neighborhood?.value,
        number: this.number?.value,
        state: this.state?.value,
        street: this.street?.value,
        complement: this.complement?.value
      },
    } as ICustomerForm;

    this.submitEvent.emit(customerSerialized);
  }

  constructor() { }

  ngOnInit(): void {

    this.customerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      birthdate: new FormControl('', [Validators.required, Validators.minLength(10)]),
      gender: new FormControl(this.genderOptions[0], [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      neighborhood: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      identification: new FormControl('', [Validators.required]),
      complement: new FormControl(''),

    })

  }

  get password() {
    return this.customerForm.get('password');
  }

  get confirmPassword() {
    return this.customerForm.get('confirmPassword');
  }

  get birthdate() {
    return this.customerForm.get('birthdate');
  }

  get name() {
    return this.customerForm.get('name')
  }

  get cpf() {
    return this.customerForm.get('cpf')
  }

  get gender() {
    return this.customerForm.get('gender')
  }

  get phone() {
    return this.customerForm.get('phone')
  }

  get email() {
    return this.customerForm.get('email')
  }

  get cep() {
    return this.customerForm.get('cep')
  }

  get state() {
    return this.customerForm.get('state')
  }

  get city() {
    return this.customerForm.get('city')
  }

  get neighborhood() {
    return this.customerForm.get('neighborhood')
  }

  get street() {
    return this.customerForm.get('street')
  }

  get number() {
    return this.customerForm.get('number')
  }

  get identification() {
    return this.customerForm.get('identification')
  }

  get complement() {
    return this.customerForm.get('complement')
  }

}
