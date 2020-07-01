import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';

import { Produto } from './produto';
import { ProdutoDbService } from './produtodb-service';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

const URL="http://localhost:3000/produtos";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private httpClient: HttpClient,
              private produtoDbService : ProdutoDbService) { }

  getProdutos() : Observable<Produto[]> {
    return new Observable(observer=> {
        this.produtoDbService.lista().subscribe( retorno => {
          if (retorno==null || retorno.length==0) {
            this.download().subscribe( retorno=> console.log('Baixando produtos'));
            observer.error('Sem produtos, tente novamente!');
          } 
          let temp = this.copyProdutos(retorno);
          observer.next(temp.filter(item => item !=null));
        })
    });
  }

  pesquisa(argumento: string) : Observable<Produto[]> {
    if (!argumento) {
      return of ([]);
    }
    
    argumento = this.capitalize(argumento);
    return this.produtoDbService.pesquisa(argumento).pipe(
      map ( lista => this.copyProdutos(lista))
    )
  }

  private copyProdutos(produtos : Produto[]) {
    let strProduto = '';
    return produtos.map(produto => {
      strProduto = JSON.stringify(produto);
      return JSON.parse(strProduto);
    });
  }

  inclui(descricao: string) {
    return new Observable(observer=>{
      let produto = {descricao};
      this.httpClient.post(URL, produto).subscribe(
        (retorno: any) => {
          produto = retorno;
          this.produtoDbService.inclui(produto).subscribe(retorno=> observer.next('Inclusão finalizada'));
      }, error=> observer.error(error)
     )});
  }

  exclui(id : number) {
    return new Observable(observer=>{
      this.httpClient.delete(URL + "/" + id).subscribe(
        retorno=>
          this.produtoDbService.exclui(id).subscribe(
            retorno=> observer.next('Finalizada exclusao'),
            error=> observer.error(error)),
        error=> observer.error(error))    
    });
  }

  download() {

    return new Observable(observer=> {
      this.httpClient.get<Produto[]>(URL).subscribe(
        retorno => {
          if (retorno.length==0) {
            observer.error(`Sem produtos para receber`);
          }

          this.produtoDbService.incluiLista(retorno).subscribe(
            retorno => observer.next(retorno),
            error => observer.error(error) 
          );
          observer.next('Finalizado download');
          observer.complete();   

        }
      ), error => {
        observer.error()}

    });
  }

  capitalize(str : string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
