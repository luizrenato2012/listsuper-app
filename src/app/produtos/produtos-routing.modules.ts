import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoInclusaoComponent } from './produto-inclusao/produto-inclusao.component';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';
import { ProdutoDownloadComponent } from './produto-download/produto-download.component';

const routes : Routes = [
    {
        path: 'novo',
        component: ProdutoInclusaoComponent
      },
      {
        path: 'pesquisa',
        component: ProdutoPesquisaComponent
      },
      {
        path: 'download',
        component: ProdutoDownloadComponent
      },
      {
        path: 'escolhe',
        component: ProdutoInclusaoComponent
      }
]
@NgModule({
    imports :[
        RouterModule.forChild(routes)
    ],
    exports : [ RouterModule]
})
export class ProdutosRoutingModule{

}