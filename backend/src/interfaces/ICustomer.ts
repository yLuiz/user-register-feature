import { IAdress } from "./IAdress";

export interface ICustomer {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    cpf: string;
    birthdate: string;
    endereco_id: string;
    created_at: Date;
    updated_at: Date;
    deleted: string;
}


export interface ICreateCustomer {
    name: string;
    email: string;
    phone: string;
    gender: string;
    cpf: string;
    birthdate: Date;
    adress: IAdress;
}