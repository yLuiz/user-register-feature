export interface ICustomerForm {
    name: string;
    cpf: string;
    gender: string;
    phone: string;
    birthdate: Date;
    email: string;
    password: string;
    confirmPassword: string;
    address: {
        cep: string;
        street: string;
        neighborhood: string;
        state: string;
        city: string;
        number: string;
        identification: string;
        complement?: string;
    };
}