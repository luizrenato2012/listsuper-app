import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-navegacao',
  templateUrl: './barra-navegacao.component.html',
  styleUrls: ['./barra-navegacao.component.css']
})
export class BarraNavegacaoComponent implements OnInit {

  // itens: MenuItem[];

  constructor() { }

  ngOnInit() {
    // this.itens = [
    //   { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: [''] },
    //   { label: 'Listas', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/listas/nova'] },
    //   { label: 'Produtos', icon: 'pi pi-fw pi-tags', routerLink: ['/produtos/novo'] },
    // ]
  }

}
