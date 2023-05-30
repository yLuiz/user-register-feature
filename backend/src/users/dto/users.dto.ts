import { Type } from "class-transformer";
import { Allow, IsDateString, IsDefined, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";

class AddressFieldDTO {
    @IsString({
        message: "O campo CEP deve ser uma string."
    })
    @IsNotEmpty({
        message: "O campo CEP é obrigatório."
    })
    @MinLength(8, {
        message: "CEP inválido."
    })
    cep: string;

    @IsString({
        message: "O campo ESTADO deve ser uma string."
    })
    @IsNotEmpty({
        message: "O campo ESTADO é obrigatório."
    })
    state: string;

    @IsString({
        message: "O campo CIDADE deve ser uma string."
    })
    @IsNotEmpty({
        message: "O campo CIDADE é obrigatório."
    })
    city: string;

    @IsString({
        message: "O campo BAIRRO deve ser uma string."
    })
    @IsNotEmpty({
        message: "O campo BAIRRO é obrigatório."
    })
    neighborhood: string;

    @IsString({
        message: "O campo LOGRADOURO deve ser uma string."
    })
    @IsNotEmpty({
        message: "O campo LOGRADOURO é obrigatório."
    })
    street: string;

    @IsString({
        message: "O campo NÚMERO deve ser uma string."
    })
    @IsNotEmpty({
        message: "O campo NÚMERO é obrigatório."
    })
    number: string;

    @IsString({
        message: "O campo COMPLEMENTO deve ser uma string."
    })
    @Allow()
    complement: string;

    @IsString({
        message: "O campo IDENTIFICAÇÃO deve ser uma string."
    })
    @IsNotEmpty({
        message: "O campo IDENTIFICAÇÃO é obrigatório."
    })
    identification: string;
}

export class UsersDTO {
    @IsString({
        message: "Nome deve ser um string."
    })
    @IsNotEmpty({
        message: "O campo NOME não pode ser vazio."
    })
    name: string;

    @IsNotEmpty({
        message: "O campo EMAIL não pode ser vazio."
    })
    @IsEmail({}, {
        message: "Insira um email válido."
    })
    email: string;

    @IsNotEmpty({
        message: "O campo GENÊRO não pode ser vazio."
    })
    @IsString({
        message: "O genêro dev ser um string."
    })
    gender: "MASCULINE" | "FEMININE" | "OTHER";

    @IsString({
        message: "Senha deve ser uma string."
    })
    @IsNotEmpty({
        message: "O campo SENHA é obrigatório."
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, {
        message: "A senha deve ser igual ou maior que 6 e conter pelo menos: uma letra maiúscula, uma minúscula, um número e um caracter especial"
    })
    @MinLength(6, {
        message: "A senha deve ser igual ou maior que 6."
    })
    password: string;

    @IsString({
        message: "O campo de CONFIRMAÇÃO DE SENHA deve ser uma string"
    })
    @IsNotEmpty({
        message: "A confirmação de senha é obrigatória."
    })
    @MinLength(6)
    confirmPassword: string;
    
    @IsString({
        message: "O campo de CPF deve ser uma string"
    })
    @IsNotEmpty({
        message: "O campo CPF é obrigatório."
    })
    @MinLength(11, {
        message: "O cpf informado não é válido."
    })
    @MaxLength(11, {
        message: "O cpf informado não é válido."
    })
    cpf: string;

    @IsNotEmpty({
        message: "O campo DATA DE NASCIMENTO é obrigatório."
    })
    @IsDateString({}, {
        message: "O campo DATA DE NASCIMENTO não é válido."
    })
    birthdate: Date;

    @IsDefined({
        message: "O campo ENDEREÇO não é válido.",
    })
    @IsNotEmptyObject({}, {
        message: "O campo ENDEREÇO não é válido.",
    })
    @IsObject({
        message: "O campo ENDEREÇO não é válido.",
    })
    @ValidateNested({
        message: "O campo ENDEREÇO não é válido.",
    })
    @Type(() => AddressFieldDTO)
    address: AddressFieldDTO;

    @IsString({
        message: "Telefone de contato deve ser uma string."
    })
    @IsNotEmpty({
        message: "O campo TELEFONE é obrigatório."
    })
    @MinLength(11, {
        message: "Telefone de contato não é válido."
    })
    phone: string;
}

/* 

- Nome
- Email
- Senha
- Confirmação de senha
- Cpf
- Data Nascimento
- Endereço: Cep, Estado, Cidade, Bairro, Logradouro, Número, Complemento, Identificação (ex: casa,)
- Telefone

*/