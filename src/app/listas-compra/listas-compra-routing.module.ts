import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ListaCompraInclusaoComponent } from './lista-compra-inclusao/lista-compra-inclusao.component';
import { ListaCompraMenuComponent } from './lista-compra-menu/lista-compra-menu.component';

const routes : Routes =[
  {
    path: 'menu',
    component: ListaCompraMenuComponent
  },
  {
      path: 'nova',
      component: ListaCompraInclusaoComponent
  },
]
@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[ RouterModule ]
})
export class ListasCompraRountingModule {

}