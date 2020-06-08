import { NgModule } from '@angular/core';
import { ProdutoDownloadComponent } from './produto-download/produto-download.component';
import { ProdutoInclusaoComponent } from './produto-inclusao/produto-inclusao.component';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

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
    ],
    imports: [
        PanelModule,
        ButtonModule,
        TableModule,
        FormsModule
    ]
})
export class ProdutosModule {

}