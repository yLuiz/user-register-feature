import { Controller, Get, Post, Param, Body, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersDTO } from './dto/customers.dto';

@Controller('customers')
export class CustomersController {

    constructor (
        private _customerService: CustomersService
    ) {}

    @Post()
    async createCustomer(@Body() customerDTO: CustomersDTO) {

        // A validação deve melhorar ainda, para assim reduzir o número de condicionais.
        const customerByEmail = await this._customerService.getCustomerByEmail(customerDTO.email);
        if (customerByEmail) {
            throw new HttpException({ message: "Já existe um usuário com este email." }, HttpStatus.BAD_REQUEST);
        }

        const customerByCPF = await this._customerService.getCustomerByCpf(customerDTO.cpf);
        if (customerByCPF) {
            throw new HttpException({ message: "Já existe um usuário com estas informações." }, HttpStatus.BAD_REQUEST);
        }

        if (customerDTO.password !== customerDTO.confirmPassword) {
            throw new HttpException({ message: "A senha e confirmação de senha não correspondem." }, HttpStatus.BAD_REQUEST);
        }

        const customerCreated = await this._customerService.createCustomer(customerDTO);
        return customerCreated;
    }
    
    @Get()
    async getAllCustomers() {
        const customers = await this._customerService.getAllCustomers();
        return customers
    }

    @Get(':id')
    async getCustomerById(@Param('id') id: string) {

        if (Number.isNaN(Number(id))) {
            throw new HttpException({ message: 'Identificador do usuário não é válido.' }, HttpStatus.NOT_FOUND);
        }

        const customer = await this._customerService.getCustomerById(Number(id));

        if (!customer) {
            throw new HttpException({ message: 'Usuário não encontrado.' }, HttpStatus.NOT_FOUND);
        }

        return customer;
    }
}
