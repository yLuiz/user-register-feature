import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ICustomerForm } from 'src/interfaces/ICustomer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, OnDestroy {

  constructor(
    private _messageService: MessageService,
    private _customerService: CustomerService,
    private _utilsService: UtilsService
  ) { }
  

  customerForm!: FormGroup;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  genderOptions = [
    { name: "Masculino", code: "masculine" },
    { name: "Feminino", code: "feminine" },
    { name: "Outro", code: "other" },
  ]

  ufToSate: any = {
    'AC': 'Acre',
    'AL': 'Alagoas',
    'AP': 'Amapá',
    'AM': 'Amazonas',
    'BA': 'Bahia',
    'CE': 'Ceará',
    'DF': 'Distrito Federal',
    'ES': 'Espírito Santo',
    'GO': 'Goías',
    'MA': 'Maranhão',
    'MT': 'Mato Grosso',
    'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais',
    'PA': 'Pará',
    'PB': 'Paraíba',
    'PR': 'Paraná',
    'PE': 'Pernambuco',
    'PI': 'Piauí',
    'RJ': 'Rio de Janeiro',
    'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia',
    'RR': 'Roraíma',
    'SC': 'Santa Catarina',
    'SP': 'São Paulo',
    'SE': 'Sergipe',
    'TO': 'Tocantins',
  }

  isSubmitted = false;
  loadingCEP = false;

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    this.isSubmitted = true;

    console.log(this.gender?.value.code)

    let customerBirthdate = this.birthdate?.value.split("/");
    customerBirthdate = [customerBirthdate[2], customerBirthdate[1], customerBirthdate[0]].join("-") + "T12:00:00.000Z"; // Para deixar o dia precisamente exato ao que foi digitado.

    if (this.customerForm.invalid) {
      this._messageService.add({
        severity: 'error',
        detail: "Verifique se todos os campos estão corretos e preenchidos",
        summary: "Formulário inválido"
      })

      this.isSubmitted = false;
      return;
    } 

    if (this.password?.value !== this.confirmPassword?.value) {
      this._messageService.add({
        severity: 'error',
        detail: "Senhas inválidas",
        summary: "Campos inválido"
      })

      this.isSubmitted = false;
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

  onCompletedBirthdate() {
    let formatedDate = this.birthdate?.value.split('/');
    formatedDate = [formatedDate[2], formatedDate[1], formatedDate[0]].join('-') + "T12:00:00.000Z";
    const isValidDate = this._utilsService.isValidDate(formatedDate);

    if (!isValidDate) {
      this._messageService.add({
        severity: 'error',
        summary: "Campo inválido",
        detail: "Data Inválida"
      })

      this.birthdate?.setValue('')

      return;
    }
  }

  onCompletedCPF() {

    console.log('completed')

    this.loadingCEP = true;

    this._utilsService.getCEP(this.cep?.value).subscribe({
      next: CEPData => {
        console.log(CEPData)
        if (CEPData.erro) {
          this._messageService.add({
            severity: 'error',
            summary: "Campo inválido",
            detail: "CEP Inválido"
          })

          this.cep?.setValue('')

          return;
        }

        this.state?.setValue(this.ufToSate[CEPData.uf])
        this.city?.setValue(CEPData.localidade)
        this.street?.setValue(CEPData.logradouro)
        this.neighborhood?.setValue(CEPData.bairro)


      },
      error: response => {
        console.error(response)
        this._messageService.add({
          severity: 'error',
          summary: "Error",
          detail: "Erro ao válidar CEP"
        })
      },
      complete: () => {
        this.loadingCEP = false;
      }
    })
  }

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

    this.state?.disable()
    this.city?.disable()
    this.street?.disable()
    this.neighborhood?.disable()

    this._customerService.actionSuccessful.subscribe(success => {
      if (!success) {
        this.isSubmitted = false;
      }
    })

  }

  ngOnDestroy(): void {
    this.isSubmitted = false;
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
