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

  constructor(private listaService: ListaCompraService, 
              private router: Router) { }

  ngOnInit() {
    this.listaEdicao = this.listaService.getListaEdicao() || new ListaCompra();
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
        console.log(`Lista gravada: ${JSON.stringify(resultado)}`)
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


}
