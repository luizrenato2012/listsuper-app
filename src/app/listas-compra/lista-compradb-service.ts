import { Inject, Injectable } from '@angular/core';
import { DatabaseService } from '../core/database/database-service';
import { ConnectionFactory } from '../core/database/ConnectionFactory';
import { LogService } from '../shared/log.service';

@Injectable({
    providedIn: 'root'
})
export class ListaCompraDbService {

    private databaseService : DatabaseService;

    constructor(factory: ConnectionFactory, logService : LogService){
        this.databaseService = new DatabaseService(factory, logService);
        this.databaseService.setStoreName('listasCompras');
    }

    lista() {
        return this.databaseService.listaTodos();
    }

    inclui(listaCompra: any) {
        return this.databaseService.inclui(listaCompra);
    }

    altera(lista : any) {
        return this.databaseService.altera(lista);
    }

    exclui(id: number) {
        return this.databaseService.exclui(id);
    }

    carrega(id : number) {
        return this.databaseService.pesquisaPorId(id);
    }



}