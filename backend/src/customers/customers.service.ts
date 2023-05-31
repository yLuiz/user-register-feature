import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { CustomersDTO } from './dto/customers.dto';

@Injectable()
export class CustomersService {
    constructor (
        private _prisma: PrismaService,
        private _utils: UtilsService
    ) {}

    async getAllCustomers() {
        const customers = await this._prisma.customer.findMany({
            include: {
                address: true
            }
        });
        return customers;
    }

    async getCustomerById(id: number) {
        const customer = await this._prisma.customer.findUnique({
            where: {
                id
            },
            include: {
                address: true
            }
        });

        return customer;
    }

    async getCustomerByEmail(email: string) {
        const customer = await this._prisma.customer.findUnique({
            where: {
                email
            }
        })

        return customer;
    }

    async getCustomerByCpf(cpf: string) {
        const customer = await this._prisma.customer.findUnique({
            where: {
                cpf
            }
        })

        return customer;
    }

    async createCustomer(customer: CustomersDTO) {
        const { name, email, cpf, gender, birthdate, address, phone } = customer;
        const result = await this._utils.isValidateCEP(address.cep);

        if (!result) {
            throw new HttpException({ message: "CEP inválido." }, HttpStatus.BAD_REQUEST);
        }

        const { cep, city, complement, identification, neighborhood, number, state, street } = address;

        try {
            const createdcustomer = await this._prisma.customer.create({
                data: {
                    name, 
                    email, 
                    cpf, 
                    gender, 
                    birthdate, 
                    phone,
                    address: {
                        create: {
                            cep, 
                            city, 
                            complement, 
                            identification, 
                            neighborhood, 
                            number, 
                            state, 
                            street
                        }
                    }, 
                }
            })
    
            return createdcustomer;
        } catch (error) {
            console.log(error);
            throw new HttpException({ message: "Erro interno no servidor" }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
