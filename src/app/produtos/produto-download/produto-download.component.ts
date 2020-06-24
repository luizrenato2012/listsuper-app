import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/shared/log.service';

@Component({
  selector: 'app-produto-download',
  templateUrl: './produto-download.component.html',
  styleUrls: ['./produto-download.component.css']
})
export class ProdutoDownloadComponent implements OnInit {

  mensagem="";
  log="";
  constructor(private logService : LogService) { }

  ngOnInit() {
    this.log = this.logService.exibe();
  }

  executaDownload() {
    console.log('Download executado');
    this.mensagem='Download executado';
    this.logService.loga('DownLoad executado');
    this.log = this.logService.exibe();
  }

}
