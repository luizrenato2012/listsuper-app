import { Injectable } from '@angular/core';
import { Produto } from './produto';

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
      {
        id: 1,
        descricao: 'Arroz',
        selecionado: false
      },
      {
        id: 2,
        descricao: 'Feijao',
        selecionado: false
      },
      {
        id: 3,
        descricao: 'Macarrão',
        selecionado: false
      },
      {
        id: 4,
        descricao: 'Oléo',
        selecionado: false
      },
      {
        id: 5,
        descricao: 'Milho',
        selecionado: false
      },
      {
        id: 6,
        descricao: 'Cebola',
        selecionado: false
      }
    ];
  }

  getProdutos() {
    return this.produtos;
  }

  pesquisa(argumento: string) {
    argumento = this.capitalize(argumento);
    return this.produtos.filter(
      produto => produto.descricao.includes(argumento));
  }

  adiciona(descricao: string) {
    let index = this.produtos.length;
    this.produtos.push({
      id: ++index,
      descricao : this.capitalize(descricao),
      selecionado : false
    });
  }

  exclui(id : number) {
    this.produtos = 
      this.produtos.filter(produto => produto.id !== id);
  }

  capitalize(str : string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
