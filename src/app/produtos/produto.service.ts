import { Injectable } from '@angular/core';
import { Produto } from './produto';
import { ProdutoInclusaoComponent } from './produto-inclusao/produto-inclusao.component';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, filter, map, catchError } from 'rxjs/operators';
import { ProdutoDbService } from './produtodb-service';

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

  adiciona(descricao: string) {
    let index = ++this.produtos.length;
    this.produtos.push(new Produto(this.capitalize(descricao), index));
  }

  exclui(id : number) {
    this.produtos = 
      this.produtos.filter(produto => produto.id !== id);
  }

  download() {
    const URL="http://localhost:3000/produtos";

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
