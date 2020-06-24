import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  private produtos: any[] = [];
  notFound = 'Não encontrado';

  constructor() { 
    this.produtos = [
      {  id: 1 , nome: 'aroz'},
      {  id: 2 , nome: 'macarrao'},
      {  id: 3 , nome: 'farinha'},
      {  id: 4 , nome: 'feijão'},
      {  id: 5 , nome: 'alcool'},
      {  id: 6 , nome: 'alho'},
      {  id: 7 , nome: 'tomate'},
      {  id: 8 , nome: 'mostarda'}
    ];
  } 
  
  // getProdutos() {
  //   return this.produtos;
  // }

  queryProdutos(value :string) {
    let res = this.produtos.filter( produto => produto.nome.startsWith(value));
    return res;
  }

}
