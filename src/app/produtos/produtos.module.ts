import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProdutoDownloadComponent } from './produto-download/produto-download.component';
import { ProdutoInclusaoComponent } from './produto-inclusao/produto-inclusao.component';
import { CommonModule } from '@angular/common';
import { ProdutosRoutingModule } from './produtos-routing.modules';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MensagensModule } from '../shared/mensagens/mensagens.module';
import { DatabaseService } from '../core/database/database-service';

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
        MensagensModule,
        ReactiveFormsModule,
        ProdutosRoutingModule,
        AutocompleteLibModule
    ]
})
export class ProdutosModule {

}