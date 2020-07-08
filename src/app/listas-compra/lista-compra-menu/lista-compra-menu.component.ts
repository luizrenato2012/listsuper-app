import { Component, OnInit } from '@angular/core';
import { ListaCompra } from '../lista-compra';
import { ListaCompraService } from '../lista-compra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-menu',
  templateUrl: './lista-compra-menu.component.html',
  styleUrls: ['./lista-compra-menu.component.css']
})
export class ListaCompraMenuComponent implements OnInit {

  listas : ListaCompra[];
  strIdSelecionado: string;
  mensagem='';

  constructor(private service: ListaCompraService, 
              private router: Router) { }

  ngOnInit() {
    this._initListas();
  }

  private _initListas() {
    this.service.getListas().subscribe((listas: any[])=> this.listas = listas);
  }

  seleciona () {
    console.log(`selecionado 1 ${JSON.stringify(this.listas[0])}`);
    const idSelecionado = this.listas[0].id;

    this.service.setListaEdicao(idSelecionado).subscribe(()=> this.router.navigateByUrl('/listas/nova'));
  }

  exclui() {
    if (!this.strIdSelecionado) {
      this.imprimeMensagem('Seleciona uma lsita para excluir');
      return;
    }

    const idSelecionado = this._getIdSelecionado();
    if (!confirm('Confirma a exclusao da lista?')) {
      return;
    }

    this.service.exclui(idSelecionado).subscribe(retorno=> {
      this.imprimeMensagem('Lista excluída com sucesso!');
      this._initListas();
    }
    , error=>{
        console.log(error);
        this.imprimeMensagem('Erro ao excluir.');
    })
  }

  _getIdSelecionado() {
    return this.strIdSelecionado!=="null" ? parseInt(this.strIdSelecionado) : null;
  }

  imprimeMensagem(msg: string) {
    this.mensagem = msg;
  }

  bloqueiaExclusao() {
    return ['', null, 'null', undefined].includes(this.strIdSelecionado);
  }

}
