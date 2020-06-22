import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProdutoDownloadComponent } from './produto-download/produto-download.component';
import { ProdutoInclusaoComponent } from './produto-inclusao/produto-inclusao.component';
import { CommonModule } from '@angular/common';
import { ProdutosRoutingModule } from './produtos-routing.modules';

@NgModule({
    declarations :[
        ProdutoDownloadComponent,
        ProdutoInclusaoComponent
    ],
    exports: [
        ProdutoDownloadComponent,
        ProdutoInclusaoComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        ProdutosRoutingModule
    ]
})
export class ProdutosModule {

}