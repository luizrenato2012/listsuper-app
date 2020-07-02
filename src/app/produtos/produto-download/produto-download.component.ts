import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/shared/log.service';
import { ProdutoService } from '../produto.service';
import { Observable } from 'rxjs';

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
              private produtoService: ProdutoService) { }

  ngOnInit() {
    this.logObservable$ = this.logService.getLog();
    this.logObservable$.subscribe( log => {
      this.exibeMensagem(log);
    })
  }

  executaDownload() {
    this.logService.registra('Iniciando download...');
    
    this.produtoService.download()
      .subscribe( retorno => {
                  console.log(`Retorno \n ${JSON.stringify(retorno)}`);
                  this.logService.registra(`${retorno}`);
                  // this.exibeMensagem(this.logService.exibe())
                }, error => {
                  console.log(error);
                  this.logService.registra(error);
                }, () => {
                  this.logService.registra('Finalizado Download');
                }
      );
  }

  exibeMensagem(mensagem: string){
    this.log+=   mensagem + "\n" ;
  }

}
