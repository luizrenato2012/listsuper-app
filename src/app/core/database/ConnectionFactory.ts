import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LogService } from 'src/app/shared/log.service';

@Injectable({
    providedIn : 'root'
})
export class ConnectionFactory {
    private connection: IDBDatabase = null;

    constructor(private logService: LogService){}
    
     getConnection() : Observable<IDBDatabase> {

        return new Observable(observer=> {

            let openDbRequest = window.indexedDB.open('listsuper', 1);

            openDbRequest.addEventListener('upgradeneeded', (event : any) => {
                this.logService.registra('Atualizando db');
                this.connection = event.target.result;
                if (! this.connection.objectStoreNames.contains('produtos')){
                    this.connection.createObjectStore('produtos', { autoIncrement: true});
                }
                observer.next(this.connection);
            });

            openDbRequest.addEventListener('success', (event:any) => {
                this.connection = event.target.result;
                this.logService.registra('Retornando conexao');
                observer.next(this.connection );
            });

            openDbRequest.addEventListener('error', (event:any) => {
                this.logService.registra('Retornando erro na conexao');
                observer.next(event.target);
            });

        });


      
    }


}