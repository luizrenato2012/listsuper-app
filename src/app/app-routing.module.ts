import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TesteComponent } from './teste/teste/teste.component';


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
    path: 'testes',
    component : TesteComponent

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
