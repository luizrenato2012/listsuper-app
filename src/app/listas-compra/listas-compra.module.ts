import { NgModule } from '@angular/core';
import { ListaCompraInclusaoComponent } from './lista-compra-inclusao/lista-compra-inclusao.component';
import { ListasCompraRountingModule } from './listas-compra-routing.module';
import { ListaCompraMenuComponent } from './lista-compra-menu/lista-compra-menu.component';


@NgModule({
    declarations: [
        ListaCompraMenuComponent,
        ListaCompraInclusaoComponent
    ],
    imports: [
        ListasCompraRountingModule
    ],
    exports: [
        ListaCompraInclusaoComponent
    ]
})
export class ListasCompraModule {

}