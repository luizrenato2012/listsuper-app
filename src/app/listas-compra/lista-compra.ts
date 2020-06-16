import * as moment from 'moment';
import { ProdutosRoutingModule } from '../produtos/produtos-routing.modules';
import { Produto } from '../produtos/produto';

export class ListaCompra{
    id: number;
    dataHora: Date;
    itens : ItemCompra[] = [];

    constructor(id?: number, dataHora? : Date){
        this.id = id;
        this.dataHora = dataHora;
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