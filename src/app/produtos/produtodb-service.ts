import { Injectable } from '@angular/core';

import { ConnectionFactory } from '../core/database/ConnectionFactory';
import { DatabaseService } from '../core/database/database-service';
import { LogService } from '../shared/log.service';
import { map } from 'rxjs/operators';
import { ListaCompraMenuComponent } from '../listas-compra/lista-compra-menu/lista-compra-menu.component';
import { ListaCompra } from '../listas-compra/lista-compra';

@Injectable({
    providedIn: 'root'
})
export class ProdutoDbService {

    private databaseService : DatabaseService;

    constructor( factory: ConnectionFactory, logService : LogService ){
        this.databaseService = new DatabaseService(factory, logService);
        this.databaseService.setStoreName('produtos');
    }

    lista() {
        return this.databaseService.listaTodos();
    }

    inclui(produto: any) {
        return this.databaseService.inclui(produto);
    }

    incluiLista(lista : any[]){
        return this.databaseService.incluiLista(lista);
    }

    pesquisa(nome: string) {
        return this.databaseService.pesquisaPorCampoTexto('descricao', nome);
    }

    exclui(id: number) {
        return this.databaseService.exclui(id);
    }

    esvazia() {
        return this.databaseService.esvazia();
    }
}