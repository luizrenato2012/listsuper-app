import { NgModule } from '@angular/core';
import { ProdutoDownloadComponent } from './produto-download/produto-download.component';
import { ProdutoInclusaoComponent } from './produto-inclusao/produto-inclusao.component';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';

@NgModule({
    declarations :[
        ProdutoDownloadComponent,
        ProdutoInclusaoComponent,
        ProdutoPesquisaComponent
    ],
    exports: [
        ProdutoDownloadComponent,
        ProdutoInclusaoComponent,
        ProdutoPesquisaComponent
    ]
})
export class ProdutosModule {

}