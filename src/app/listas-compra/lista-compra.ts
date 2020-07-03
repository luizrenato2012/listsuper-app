
import { Produto } from '../produtos/produto';

import * as moment from 'moment';
import { ListaCompraMenuComponent } from './lista-compra-menu/lista-compra-menu.component';

export class ListaCompra{
    id: number;
    dataHora: Date;
    itens : ItemCompra[] = [];

    constructor(id?: number, dataHora? : Date, itens?: ItemCompra[]){
        this.id = id;
        this.dataHora = dataHora;
        this.itens = itens || [];
    }

    static build(objeto: any) {
        return new ListaCompra( objeto.id,objeto.dataHora, objeto.itens);
    }

    getAny () {
        return {
            dataHora: this.dataHora,
            itens: this.itens 
        }
    }

    get nome () {
        if (this.id==null) {
            return 'Nova';
        }

        if (this.id==-1) {
            return 'Escolha';
        }

        return this.id + ' - ' + 
            moment(this.dataHora).format('DD/MM/YYYY HH:MM');
    }
}

export class ItemCompra{
    id: number;
    descricao: string;
    marca: string;
    quantidade: string;
    noCarrinho: boolean;

    constructor(produto?: Produto) {
        if (produto) {
            this.id = produto.id;
            this.descricao = produto.descricao;
            this.noCarrinho = false;
            this.quantidade = "";
        }
    }
}