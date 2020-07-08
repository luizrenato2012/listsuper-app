import { Component, OnInit } from '@angular/core';
import { ListaCompra, ItemCompra } from '../lista-compra';
import { ListaCompraService } from '../lista-compra.service';
import { Router } from '@angular/router';

import * as $ from 'jquery'; 

@Component({
  selector: 'app-lista-inclusao',
  templateUrl: './lista-compra-inclusao.component.html',
  styleUrls: ['./lista-compra-inclusao.component.css']
})
export class ListaCompraInclusaoComponent implements OnInit {

  listaEdicao : ListaCompra ;
  mensagem : string = "";
  itemEdicao = new ItemCompra();

  classeSelecao="table-danger";
  ordenacoes : any[] = [];

  constructor(private listaService: ListaCompraService, 
              private router: Router) { }

  ngOnInit() {
    this.listaEdicao = this.listaService.getListaEdicao() || new ListaCompra();
    this.ordenacoes = [ 
      {'tipo': 'ID', 'label': 'Ordem por Criação'},
      {'tipo': 'DESCRICAO', 'label': 'Ordem por Descricao'}
    ];
  }

  volta(){
    this.router.navigateByUrl('/listas/menu');
  }

  grava() {
    const isInsert = this.listaEdicao.id===null;
    if (isInsert) {
      this.listaEdicao.dataHora = new Date();
    }
    // retirado id na inclusao pela geracao do mesmo no IndexedDB
    this.listaService.grava(isInsert ? this.listaEdicao.getAny() : this.listaEdicao)
      .subscribe( (resultado: any) => {
        if (isInsert){
          this.listaEdicao.id = resultado;
        }
        this.imprimeMensagem('Lista gravada com sucesso!!');
    });
  }

  escolhe(){
    this.router.navigate(['produtos','escolhe']);
  }

  imprimeMensagem(msg: string) {
    this.mensagem = msg;
  }

  exibeMensagem() {
    return this.mensagem !==null && this.mensagem!== '';
  }

  altera(item: ItemCompra) {
    this.itemEdicao = item;
    $('#mdl_item').show("slow");
  }

  fecha() {
    $('#mdl_item').fadeOut();
  }

  exclui(id: number) {
    if (confirm('Confirma a exclusao do item?')) {
      this.listaEdicao.itens = this.listaEdicao.itens.filter( item => item.id !== id);
    }
  }

  changeOrdenacao(escolha : string) {
    if (this.listaEdicao.itens) {
      this._ordenaItens(escolha);
    }
  }
  private _ordenaItens(escolha: string) {
    if (escolha === 'ID') {
      this._ordenaItensPorId();
    } else {
      this._ordenaItensPorDescricao();
    }
  }
  private _ordenaItensPorDescricao() {
    this.listaEdicao.itens.sort((item1 : ItemCompra, item2: ItemCompra)=>{
      const descricao1 = item1.descricao;
      const descricao2 = item2.descricao;
  
      if (item1 ==null || descricao1==null) {
        return -1;
      }
      if (item2 ==null || descricao2==null) {
        return 1;
      }
  
      return descricao1.localeCompare(descricao2);
    });
  }

  private _ordenaItensPorId() {
    this.listaEdicao.itens.sort((item1 : ItemCompra, item2: ItemCompra)=>{
      const id1 = item1.id;
      const id2 = item2.id;
  
      if (item1 ==null || id1==null) {
        return -1;
      }
      if (item2 ==null || id2==null) {
        return 1;
      }
      
      if (id1 < id2 ) {
        return -1;
      } 
      if (id1 > id2 ) {
        return 1;
      }
      return 0;
    });
  }


}
