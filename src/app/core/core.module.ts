import { NgModule } from '@angular/core';

import { BarraNavegacaoComponent } from './barra-navegacao/barra-navegacao.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [BarraNavegacaoComponent],
    exports: [ BarraNavegacaoComponent],
    imports: [
        RouterModule
    ]

})
export class CoreModule {

}