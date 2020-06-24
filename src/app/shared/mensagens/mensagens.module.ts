import { NgModule } from '@angular/core';
import { MensagensComponent } from './mensagens.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ MensagensComponent ],
    exports: [ MensagensComponent ],
    imports: [ CommonModule]
})
export class MensagensModule {

}