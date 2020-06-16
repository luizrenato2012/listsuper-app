import { Injectable } from '@angular/core';
import { Produto } from './produto';
import { ProdutoInclusaoComponent } from './produto-inclusao/produto-inclusao.component';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtos : Produto[] = [];

  constructor() {
    this.init();
   }

  init() {
    this.produtos = [
      new Produto( 1,'Arroz'),
      new Produto(  2,'Feijao'),
      new Produto( 3, 'Macarrão'),
      new Produto( 4,'Oléo'),
      new Produto( 5, 'Milho'),
      new Produto( 6,'Cebola')
    ];
  }

  getProdutos() {
    return this.copyProdutos(this.produtos);
  }

  pesquisa(argumento: string) {
    argumento = this.capitalize(argumento);
    const produtosFiltro= this.produtos.filter(produto => produto.descricao.includes(argumento));
    return this.copyProdutos(produtosFiltro);  
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
    this.produtos.push(new Produto(index,this.capitalize(descricao)));
  }

  exclui(id : number) {
    this.produtos = 
      this.produtos.filter(produto => produto.id !== id);
  }

  capitalize(str : string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
