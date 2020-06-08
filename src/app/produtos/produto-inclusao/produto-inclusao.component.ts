import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-produto-inclusao',
  templateUrl: './produto-inclusao.component.html',
  styleUrls: ['./produto-inclusao.component.css']
})
export class ProdutoInclusaoComponent implements OnInit {
  produtos : any[];

  constructor() { }

  ngOnInit() {
    this.produtos = [
      {id: 1, descricao: 'Arroz', selecionado:false}, 
      {id: 2, descricao: 'Feijao', selecionado:false}, 
      {id: 3, descricao: 'Macarrao', selecionado:false}, 
    ];
  }

  isSelecionado() {
    return this.produtos.find( produto => produto.selecionado);
  }

  exclui() {
    let resposta = confirm('Confirma a exclusao do produto?');
    console.log(`Resposta ${resposta}`);
  }

}
