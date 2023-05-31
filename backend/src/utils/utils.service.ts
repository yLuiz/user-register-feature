import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UtilsService {
    constructor (
        private _httpService: HttpService
    ) {}

    async isValidateCEP(cep: string): Promise<Boolean> {
        
        try {
            
            const result = (await firstValueFrom(this._httpService.get(`https://viacep.com.br/ws/${cep}/json/`))).data;

            return !result?.erro;

        } catch (error) {

            console.error(error);

            if (error.response.status === 400) {
                throw new HttpException({ message: 'CEP inválido.'}, HttpStatus.BAD_REQUEST)
            }

            throw new HttpException({ message: 'Erro no servidor'}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
