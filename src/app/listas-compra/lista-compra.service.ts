import { Injectable } from '@angular/core';
import { ListaCompra, ItemCompra } from './lista-compra';
import { Produto } from '../produtos/produto';
import { ListaCompraDbService } from './lista-compradb-service';
import { Observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

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
    // console.log(`Getando lista edicao ${JSON.stringify(this.listaEdicao)}`);
    return this.listaEdicao;
  }

  setListaEdicao(id : number) {
    return new Observable(observer=>{
      // console.log(`Setando lista edicao ${JSON.stringify(this.listaEdicao)}`);
      if (id==null){
        this.listaEdicao = new ListaCompra(null,null);
        observer.next();
      }
  
      const lista = this.listaDbService.carrega(id).subscribe(lista=> {
        if (lista==null) {
          observer.error('Não encontrada Lista de Compra id [' + id + ']');
        }
        this.listaEdicao = ListaCompra.build(lista);
        observer.next();
        });
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

 


}
