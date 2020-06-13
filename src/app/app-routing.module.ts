import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'listas',
    loadChildren: './listas-compra/listas-compra.module#ListasCompraModule'
  },
  {
    path: 'produtos',
    loadChildren: './produtos/produtos.module#ProdutosModule'
  },
  {
    path: '', redirectTo: '/', 
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
