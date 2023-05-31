import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ICEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _http: HttpClient
  ) { }

  getCEP(cep: string) {
    return this._http.get<ICEP>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  isValidDate(date: string) {

    const newDate = new Date(date);

    if (String(newDate) === "Invalid Date" || newDate.getFullYear() > new Date().getFullYear() - 15) {
      return false;
    }

    return newDate;
  }
}
