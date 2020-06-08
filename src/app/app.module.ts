import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacaoComponent } from './core/barra-navegacao/barra-navegacao.component';
import { ProdutosModule } from './produtos/produtos.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProdutosModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
