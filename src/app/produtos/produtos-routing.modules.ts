import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoInclusaoComponent } from './produto-inclusao/produto-inclusao.component';
import { ProdutoDownloadComponent } from './produto-download/produto-download.component';

const routes : Routes = [
    {
        path: 'novo',
        component: ProdutoInclusaoComponent
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