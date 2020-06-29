import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  // private log = '';

  private logBehavior= new BehaviorSubject<string>('');
  constructor() { }

  registra(mensagem: string) {
    const dataHora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
    mensagem = dataHora + ' - ' + mensagem;
    // this.log = this.log + mensagem +'\n';
    this.logBehavior.next(mensagem);  
  }

  getLog() {
    return this.logBehavior.asObservable();
  }
}