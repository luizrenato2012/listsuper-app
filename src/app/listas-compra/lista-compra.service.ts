import { Injectable } from '@angular/core';
import { ListaCompra, ItemCompra } from './lista-compra';
import { Produto } from '../produtos/produto';

@Injectable({
  providedIn: 'root'
})
export class ListaCompraService {

  listas : ListaCompra [] = [];
  listaEdicao : ListaCompra;

  constructor() { 
    this.init();
  }

  init(){
    this.listas.push(
      new ListaCompra(null, null)
    );

    this.listas.push(
      new ListaCompra(1, new Date())
    );
  }

  getListas() {
    return this.listas;
  }

  getListaEdicao() {
    return this.listaEdicao;
  }

  setListaEdicao(id : number) {
    if (id==null){
      this.listaEdicao = new ListaCompra(null,null);
      return;
    }

    const lista = this.getListaById(id);
    if (lista==null) {
      throw Error('Não encontrada Lista de Compra id [' + id + ']');
    }
    this.listaEdicao = lista;
  }

  getListaById(id: number) {
    return this.listas.find( lista => lista.id === id);
  }

  adicionaItens(produtos : Produto[]){
    produtos.forEach( produto => this.listaEdicao.itens.push(new ItemCompra(produto)) );
  }

  grava(){
    if(this.listaEdicao.id==null) {
      this.listaEdicao.id = this.getNextId();
      this.listaEdicao.dataHora = new Date();
      this.listas.push(this.listaEdicao);
    }
  }

  private getNextId() {
    return this.listas.length++;
  }
}
