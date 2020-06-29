import { Injectable } from '@angular/core';
import { Produto } from './produto';
import { ConnectionFactory } from '../core/database/ConnectionFactory';
import { DatabaseService } from '../core/database/database-service';
import { LogService } from '../shared/log.service';

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

    inclui(produto: Produto) {
        return this.databaseService.inclui(produto);
    }

    incluiLista(lista : any[]){
        return this.databaseService.incluiLista(lista);
    }

    pesquisa(nome: string) {
        return this.databaseService.pesquisaPorCampoTexto('descricao', nome);
    }
}