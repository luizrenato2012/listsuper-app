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

  constructor(private service: ListaCompraService, 
              private router: Router) { }

  ngOnInit() {
    this.listaEdicao = this.service.getListaEdicao() || new ListaCompra();
  }

  volta(){
    this.router.navigateByUrl('/listas/menu');
  }

  grava() {
    this.service.grava();
    this.imprimeMensagem('Lista gravada com sucesso!!');
  }

  escolhe(){
    this.router.navigate(['produtos','escolhe']);
  }

  imprimeMensagem(msg: string) {
    console.log(`Mensagem ${msg}`);
    this.mensagem = msg;
  }

  exibeMensagem() {
    return this.mensagem !==null && this.mensagem!== '';
  }

  altera(item: ItemCompra) {
    // alert(`Alterando ${JSON.stringify(item)}`);
    this.itemEdicao = item;
    $('#mdl_item').show("slow");
  }

  fecha() {
    $('#mdl_item').fadeOut();
  }

}
