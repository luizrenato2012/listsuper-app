import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ListaCompra, ItemCompra } from './lista-compra';
import { Produto } from '../produtos/produto';
import { ListaCompraDbService } from './lista-compradb-service';

@Injectable({
  providedIn: 'root'
})
export class ListaCompraService {

  listaEdicao : ListaCompra;

  constructor(private listaDbService: ListaCompraDbService) { 
   }

  getListas() {
    return new Observable(observer=> {
      this.listaDbService.lista().subscribe( lista => {
      let novaLista = [new ListaCompra(null, null)];

      observer.next(novaLista.concat(
        lista.map(elemento=> new ListaCompra(elemento.id, elemento.dataHora))));
    }, error=> observer.error(error));
    });
  }

  getListaEdicao() {
    let id = 0 ;
    if (this.listaEdicao.itens){
      // this._ordernaItensPorDescricao(this.listaEdicao.itens);
       this.listaEdicao.itens.forEach(item=> item.id = ++id);
    }
    return this.listaEdicao;
  }

  private _ordernaItensPorDescricao(itens : ItemCompra[]){
    if (!itens) {
      return [];
    }

    itens.sort((item1: ItemCompra, item2: ItemCompra)  => {
      if (!item1 || !item1.descricao) {
        return 1;
      }
      if (!item2 || !item2.descricao) {
        return -1;
      }
      if (item1.descricao < item2.descricao){
        return -1;
      }
      if (item1.descricao > item2.descricao){
        return 1;
      }
      return 0;
    });
  }

  setListaEdicao(id : number) {
    return new Observable(observer=>{
      if (id==null){
        this.listaEdicao = new ListaCompra(null,null);
        observer.next();
        return; //observer.complete() não terminou o fluxo
      }

      const lista = this.listaDbService.carrega(id).subscribe(lista=> {
        if (lista==null) {
          observer.error('Não encontrada Lista de Compra id [' + id + ']');
        }
        this.listaEdicao = ListaCompra.build(lista);
        observer.next();
        }, error => console.log(`Erro ao selecionar lista ${error}`));
    });
  }
   

  adicionaItens(produtos : Produto[]){
    produtos.forEach( produto => this.listaEdicao.itens.push(new ItemCompra(produto)) );
  }

  grava(listaCompra : any){
    if (listaCompra.id==null) {
      return  this.listaDbService.inclui(listaCompra);
    } else {
      return this.listaDbService.altera(listaCompra);
    }
  }

  exclui(id: number) {
    return new Observable(observer=>{
          this.listaDbService.exclui(id).subscribe(
            retorno=> observer.next('Finalizada exclusao'),
            error=> observer.error(error))
    });
  }

 


}
