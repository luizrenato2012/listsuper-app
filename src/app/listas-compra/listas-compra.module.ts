import { NgModule } from '@angular/core';
import { ListaCompraInclusaoComponent } from './lista-compra-inclusao/lista-compra-inclusao.component';
import { ListasCompraRountingModule } from './listas-compra-routing.module';
import { ListaCompraMenuComponent } from './lista-compra-menu/lista-compra-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensagensModule } from '../shared/mensagens/mensagens.module';


@NgModule({
    declarations: [
        ListaCompraMenuComponent,
        ListaCompraInclusaoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ListasCompraRountingModule,
        MensagensModule
    ],
    exports: [
        ListaCompraInclusaoComponent
    ]
})
export class ListasCompraModule {

}