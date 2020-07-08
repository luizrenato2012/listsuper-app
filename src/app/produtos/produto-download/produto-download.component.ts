import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LogService } from 'src/app/shared/log.service';
import { ProdutoService } from '../produto.service';

import { environment } from '../../../environments/environment';

const URL_STATUS=`${environment.apiUrl}/status`;

@Component({
  selector: 'app-produto-download',
  templateUrl: './produto-download.component.html',
  styleUrls: ['./produto-download.component.css']
})
export class ProdutoDownloadComponent implements OnInit {

  mensagem="";
  log="";
  logObservable$ : Observable<string>;

  constructor(private logService : LogService,
              private produtoService: ProdutoService,
              private httpCliente: HttpClient) { }

  ngOnInit() {
    this.logObservable$ = this.logService.getLog();
    this.logObservable$.subscribe( log => {
      this.exibeMensagem(log);
    })
  }

  executaDownload() {
    this.logService.registra('Apagando coleção...');

    this.produtoService.esvaziaStore().subscribe(()=> {
      this.logService.registra('Apagada coleção.')
      this.logService.registra('Iniciando download...')
      this.produtoService.download().subscribe(()=> {
        this.logService.registra('Finalizado download.');
      }, error=> {
        this._trataLog(error);
      });
    }, error => {
      this._trataLog(error);
    });
  }

  private _trataLog(error) {
    console.log(error);
    this.logService.registra(error);
  }

  // private _download() {
  //   this.produtoService.download()
  //     .subscribe( retorno => {
  //           console.log(`Retorno \n ${JSON.stringify(retorno)}`);
  //           this.logService.registra(`${retorno}`);
  //           // this.exibeMensagem(this.logService.exibe())
  //         }, error => {
  //           this._trataLog(error);
  //         }, () => {
  //           this.logService.registra('Finalizado Download');
  //         }
  //     );
  // }

  exibeMensagem(mensagem: string){
    this.log+=   mensagem + "\n" ;
  }

  verificaServer() {
    let mensagem ='';
    this.logService.registra('Executando manutenção');
    this.httpCliente.get(URL_STATUS).subscribe((status:any)=> {
      mensagem = `Situacao: ${status.descricao}\n`;
      mensagem = mensagem.concat(`Servidor: ${status.endereco}\n`);
      mensagem = mensagem.concat(`No Produtos : ${status.numeroProdutos}\n`);
      this.logService.registra(mensagem);
    }, error=> {
      console.log(error);
      this.logService.registra(JSON.stringify(error));
    })
  }

  limpaLog() {
    this.logService.registra('Limpando log');
    this.log='';
  }

}
