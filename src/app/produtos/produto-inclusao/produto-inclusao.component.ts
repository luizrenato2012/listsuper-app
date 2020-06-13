import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-inclusao',
  templateUrl: './produto-inclusao.component.html',
  styleUrls: ['./produto-inclusao.component.css']
})
export class ProdutoInclusaoComponent implements OnInit {
  produtos : Produto[];

  formProduto: FormGroup;
  
  @ViewChild("btnGrava", {read: false, static: true})
  btnSave: ElementRef<HTMLButtonElement>;

  mensagem : string = "";
  
  constructor(private service: ProdutoService, private builder: FormBuilder) { }

  ngOnInit() {
    this.btnSave.nativeElement.disabled = true;
    
    // console.log(`Produtos: ${this.produtos}`);
    this.formProduto = this.builder.group({
      'descricao' : ['']
    });
    
    let edtDescricao = this.formProduto.get('descricao');
    console.log(`Valor inicial: ${edtDescricao.value}`);
    edtDescricao.valueChanges
      .pipe(
        distinctUntilChanged( (prev, cur)=>{
          return this.verificaDigitacao(prev, cur);
        }),
      ).subscribe(value=> {
        this.ocultaMensagem();
        console.log(`Alterando ${value}`); 
          this.btnSave.nativeElement.disabled = !value ;
      });
  }

  /** filtra alteracao de argumento somente baseado no tamanho do argumento digitado */
  verificaDigitacao(prev, cur) {
    if (prev==null || cur==null) {
      return null;
    }
    const l1 = prev.length;
    const l2 = cur.length;
    return !(l1 === 0 && l2 === 1) && !(l1 == 1 && l2 == 0) ;
  }

  isSelecionado() {
    return this.produtos.find( produto => produto.selecionado);
  }

  exclui(id: number) {
    this.ocultaMensagem();
    if (confirm('Confirma a exclusao do produto?')) {
      console.log(`Excluindo  ${id}`);
      this.service.exclui(id);
      this.pesquisa(this.formProduto.get('descricao') as FormControl);
      this.imprimeMensagem("Produto Excluído com Sucesso!");
    }
  }

  grava(descricao: FormControl) {
    if (descricao.value==null) {
      return;
    }
    this.service.adiciona(descricao.value);
    descricao.reset();
    this.imprimeMensagem("Produto gravado com sucesso");
  }

  pesquisa(argumento?: FormControl) {
    let descricao = argumento.value;
    if (!descricao) {
      this.produtos = this.service.getProdutos();
    } else {
      this.produtos = this.service.pesquisa(descricao);
    }
  }

  imprimeMensagem(msg: string) {
    console.log(`Mensagem ${msg}`);
    this.mensagem = msg;
  }

  exibeMensagem() {
    return this.mensagem !==null && this.mensagem!== '';
  }

  ocultaMensagem() {
    this.mensagem = '';
  }

  volta() {
    console.log('Voltando');
  }

}
