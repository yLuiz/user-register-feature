import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICreateUser } from 'src/interfaces/IUser';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { UsersDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor (
        private _prisma: PrismaService,
        private _utils: UtilsService
    ) {}

    async getAllUsers() {
        const users = await this._prisma.user.findMany();
        return users;
    }

    async getUserById(id: number) {
        const user = await this._prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new HttpException({ message: 'Usuário não encontrado.' }, HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this._prisma.user.findUnique({
            where: {
                email
            }
        })

        return user;
    }

    async getUserByCpf(cpf: string) {
        const user = await this._prisma.user.findUnique({
            where: {
                cpf
            }
        })

        return user;
    }

    async createUser(user: UsersDTO) {
        const { name, email, cpf, gender, birthdate, address, phone } = user;
        const result = await this._utils.isValidateCEP(address.cep);

        if (!result) {
            throw new HttpException({ message: "CEP inválido." }, HttpStatus.BAD_REQUEST);
        }

        const { cep, city, complement, identification, neighborhood, number, state, street } = address;

        const createduser = await this._prisma.user.create({
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

        return user;

    }

}
