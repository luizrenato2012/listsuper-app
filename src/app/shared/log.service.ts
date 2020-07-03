import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  // private log = '';

  private logBehavior= new BehaviorSubject<string>('');
  constructor() { }

  registra(mensagem: string) {
    const dataHora = moment(new Date()).format('HH:MM:SS');
    mensagem = dataHora + ' - ' + mensagem;
    // this.log = this.log + mensagem +'\n';
    this.logBehavior.next(mensagem);  
  }

  getLog() {
    return this.logBehavior.asObservable();
  }
}
