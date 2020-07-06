import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';

import { Produto } from './produto';
import { ProdutoDbService } from './produtodb-service';
import { environment } from 'src/environments/environment';


const URL_PRODUTOS=`${environment.apiUrl}/produtos`;

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
          let temp = this._copyProdutos(retorno);
          observer.next(temp.filter(item => item !=null));
        })
    });
  }

  pesquisa(argumento: string) : Observable<Produto[]> {
    if (!argumento) {
      return of ([]);
    }
    
    argumento = this._capitalize(argumento);
    return this.produtoDbService.pesquisa(argumento).pipe(
      map ( lista => this._copyProdutos(lista))
    )
  }

  _capitalize(str : string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private _copyProdutos(produtos : Produto[]) {
    produtos.sort(this._orderna);
    let strProduto = '';
    return produtos.map(produto => {
      strProduto = JSON.stringify(produto);
      return JSON.parse(strProduto);
    });
  }

  _orderna(produto1 : Produto, produto2: Produto){
    const descricao1 = produto1.descricao;
    const descricao2 = produto2.descricao;

    if (produto1 ==null || descricao1==null) {
      return -1;
    }
    if (produto2 ==null || descricao2==null) {
      return 1;
    }

    if (descricao1 < descricao2) {
      return -1;
    }

    if (descricao2 < descricao1) {
      return 1;
    }

    return 0;
  }

  inclui(descricao: string) {
    return new Observable(observer=>{
      let produto = {descricao};
      this.httpClient.post(URL_PRODUTOS, produto).subscribe(
        (retorno: any) => {
          produto = retorno;
          this.produtoDbService.inclui(produto).subscribe(retorno=> observer.next('Inclusão finalizada'));
      }, error=> observer.error(error)
     )});
  }

  exclui(id : number) {
    return new Observable(observer=>{
      this.httpClient.delete(URL_PRODUTOS + "/" + id).subscribe(
        retorno=>
          this.produtoDbService.exclui(id).subscribe(
            retorno=> observer.next('Finalizada exclusao'),
            error=> observer.error(error)),
        error=> observer.error(error))    
    });
  }

  download() {
    return new Observable(observer=> {
      this.httpClient.get<Produto[]>(URL_PRODUTOS).subscribe(
        retorno => this._processaRetorno(observer, retorno),
        error => {
          let errorMsg = error.message ? error.message : JSON.stringify(error);
          console.log(`Erro no download:  ${JSON.stringify(error)}`);
          observer.error(`Erro no servidor ${errorMsg}`);
        });
      });
  }

  private _processaRetorno(observer, retorno) {
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

  esvaziaStore() {
    return this.produtoDbService.esvazia();
  }

}
