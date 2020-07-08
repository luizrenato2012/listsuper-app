import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logBehavior= new BehaviorSubject<string>('');

  registra(mensagem: string) {
    moment.locale('pt-BR');
    const data = new Date();
    const dataHora = moment(data).format('HH:MM:SS');
    console.log(`dataHora ${data} ${mensagem}`);
    mensagem = dataHora + ' - ' + mensagem;
    // this.log = this.log + mensagem +'\n';
    this.logBehavior.next(mensagem);  
  }

  getLog() {
    return this.logBehavior.asObservable();
  }
}
