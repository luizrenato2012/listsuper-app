import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosModule } from './produtos/produtos.module';
import { ProdutoInclusaoComponent } from './produtos/produto-inclusao/produto-inclusao.component';
import { ProdutoPesquisaComponent } from './produtos/produto-pesquisa/produto-pesquisa.component';
import { ProdutoDownloadComponent } from './produtos/produto-download/produto-download.component';


const routes: Routes = [
  {
    path: 'produtos/novo',
    component: ProdutoInclusaoComponent
  },
  {
    path: 'produtos/pesquisa',
    component: ProdutoPesquisaComponent
  },
  {
    path: 'produtos/download',
    component: ProdutoDownloadComponent
  },
  { 
    path: '', redirectTo: 'produtos/novo', 
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
