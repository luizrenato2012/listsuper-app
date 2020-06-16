import { Component, OnInit } from '@angular/core';
import { ListaCompra } from '../lista-compra';
import { ListaCompraService } from '../lista-compra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-menu',
  templateUrl: './lista-compra-menu.component.html',
  styleUrls: ['./lista-compra-menu.component.css']
})
export class ListaCompraMenuComponent implements OnInit {

  listas : ListaCompra[];
  strIdSelecionado: string;

  constructor(private service: ListaCompraService, 
              private router: Router) { }

  ngOnInit() {
    this.listas = this.service.getListas();
  }

  seleciona () {
    console.log(`item selecionado ${this.strIdSelecionado}` );
    this.service.setListaEdicao(this.strIdSelecionado!=="null" ? parseInt(this.strIdSelecionado) : null);
    this.router.navigateByUrl('/listas/nova');
  }

}
