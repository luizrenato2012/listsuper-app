import { Component, OnInit } from '@angular/core';
import { TesteService } from '../teste.service';
import { ProdutoDbService } from 'src/app/produtos/produtodb-service';
import { Produto } from 'src/app/produtos/produto';
import { DatabaseService } from 'src/app/core/database/database-service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  items : any[];
  keyword = 'nome';
  produto: any;

  constructor(private service: TesteService,
              private produtoService: ProdutoDbService) { }

  ngOnInit() {
    this.items = []
  }

  // do something with selected item
  selectEvent( item ) {
    console.log({item});
    this.produto = item;
  }

  // fetch remote data from here
  // and reassign the 'data' wich is binded to 'data' property
  onChangeSearch( value: string ){
    console.log(` Pesquisando ${value}`);
    
    this.items = !value ? [] : this.service.queryProdutos(value);
  }

  onFocused(item) {
    console.log('Perda de foco');
  }

  incluiProduto() {
    // let produto = new Produto( "Papel toalha");
    this.produtoService.inclui(this.produto).subscribe(
      retorno=> {
        alert(`${JSON.stringify(retorno)}`);
      },
      error => {
        console.log(error);
      }
    )
  }

  listaProduto() {
    this.produtoService.lista().subscribe(
      retorno => {
        console.log(`Retorno ${retorno}`);
      }
    )
  }

}
