import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private log = '';
  constructor() { }

  loga(mensagem: string) {
    this.log = this.log + mensagem +'\n';
  }

  exibe() {
    return this.log;
  }
}
