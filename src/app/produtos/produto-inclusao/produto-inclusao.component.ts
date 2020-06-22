import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { distinctUntilChanged, filter, tap, map, toArray, defaultIfEmpty, mergeAll } from 'rxjs/operators';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaCompraService } from 'src/app/listas-compra/lista-compra.service';
import { Observable, from, of, concat } from 'rxjs';

@Component({
  selector: 'app-produto-inclusao',
  templateUrl: './produto-inclusao.component.html',
  styleUrls: ['./produto-inclusao.component.css']
})
export class ProdutoInclusaoComponent implements OnInit {
  produtos : Produto[] = [];

  formProduto: FormGroup;
  
  @ViewChild("btnGrava", {read: false, static: true})
  btnSave: ElementRef<HTMLButtonElement>;

  mensagem : string = "";

  isOrigemLista = false;

  constructor(private produtoService: ProdutoService, 
              private listaService : ListaCompraService,
              private builder: FormBuilder,
              private router : Router) { }

  ngOnInit() {
   this.initForm();
   this.isOrigemLista = this.router.url.endsWith('escolhe') ? true : false
  }

  private initForm() {
    this.btnSave.nativeElement.disabled = true;
    
    this.formProduto = this.builder.group({
      'descricao' : ['']
    });
    
    let edtDescricao = this.formProduto.get('descricao');
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

  exclui(id: number) {
    this.ocultaMensagem();
    if (confirm('Confirma a exclusao do produto?')) {
      console.log(`Excluindo  ${id}`);
      this.produtoService.exclui(id);
      this.pesquisa(this.formProduto.get('descricao') as FormControl);
      this.imprimeMensagem("Produto Excluído com Sucesso!");
    }
  }

  grava(descricaoControl: FormControl) {
    let descricao = descricaoControl.value;
    if (descricao==null) {
      console.error("Erro ao incluir produto - descricao invalida");
      return;
    }
    this.produtoService.adiciona(descricao);
    descricaoControl.reset();
    this.imprimeMensagem("Produto gravado com sucesso");
  }

  pesquisa(argumento?: FormControl) {
    
    let descricao = argumento.value;
    let observableTemp$ : Observable<Produto[]>;
    let selecionados = this.getProdutosSelecionados();

    if (!descricao) {
      observableTemp$ = this.produtoService.getProdutos();
    } else {
      observableTemp$ = this.produtoService.pesquisa(descricao);
    }

    observableTemp$.subscribe(retorno => {
      this.produtos = this.isOrigemLista ? selecionados.concat(retorno) : retorno;  
    });

  }

  imprimeMensagem(msg: string) {
    this.mensagem = msg;
  }

  exibeMensagem() {
    return this.mensagem !==null && this.mensagem!== '';
  }

  ocultaMensagem() {
    this.mensagem = '';
  }

  volta() {
    if (this.isOrigemLista) {
        let selecionados = this.getProdutosSelecionados();
        this.listaService.adicionaItens(selecionados);
        this.router.navigate(['listas','nova']);
        return;
    }
    this.router.navigate( ['']);
  }

  private getProdutosSelecionados() {
      return this.produtos.filter(produto => produto.selecionado);
  }

  private criaTeste() : Observable<any[]> {
    let obs$ : Observable<any[]> = of ([
      {id: 1 , nome: 'Teste 1', marcado : false},
      {id: 2 , nome: 'Teste 2', marcado : true},
      {id: 3 , nome: 'Teste 3', marcado : true},
      {id: 4 , nome: 'Teste 4', marcado : true}
    ]);
   //  return obs$;
    return obs$.pipe(
      map(obs => obs.filter(obj => obj.marcado==true))
    );
  }

    executaTeste() {
      console.log('Executando teste');
      let itens = this.criaTeste();
      itens.subscribe( item => {
        console.log( item);
      });
    }

}
