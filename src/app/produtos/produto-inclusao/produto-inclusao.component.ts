import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { distinctUntilChanged, filter, tap, map, toArray, defaultIfEmpty, mergeAll } from 'rxjs/operators';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaCompraService } from 'src/app/listas-compra/lista-compra.service';
import { Observable, from, of, concat } from 'rxjs';
import { LogService } from 'src/app/shared/log.service';

const TAMANHO_DESCRICAO=3;
@Component({
  selector: 'app-produto-inclusao',
  templateUrl: './produto-inclusao.component.html',
  styleUrls: ['./produto-inclusao.component.css']
})
export class ProdutoInclusaoComponent implements OnInit {
  produtos : Produto[] = [];
  produtosPesquisa : Produto[] = [];

  formProduto: FormGroup;
  
  @ViewChild("btnGrava", {read: false, static: true})
  btnSave: ElementRef<HTMLButtonElement>;

  mensagem : string = "";
  /** argumento de pesquisa do autocomplete  */
  completeArg = "descricao";

  isOrigemLista = false;

  constructor(private produtoService: ProdutoService, 
              private listaService : ListaCompraService,
              private builder: FormBuilder,
              private router : Router,
              private logService: LogService) { }

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
        //console.log(`Alterando ${value}`); 
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
      this.produtoService.exclui(id).subscribe(retorno=> {
        this.pesquisa(this.formProduto.get('descricao') as FormControl);
        this.imprimeMensagem("Produto Excluído com Sucesso!");
      }, error=> {
        console.error(error);
        this.imprimeMensagem("Erro ao excluir");
      })
    }
  }

  grava(descricaoControl: AbstractControl) {
    let descricao = descricaoControl.value;
    if (descricao==null || descricao.length < TAMANHO_DESCRICAO) {
      this.imprimeMensagem("Erro ao incluir produto - descricao invalida");
      return;
    }
    this.produtoService.inclui(descricao).subscribe(retorno=>{
      descricaoControl.reset();
      this.imprimeMensagem("Produto gravado com sucesso");
    }, error=> {
      console.log(error);
      this.imprimeMensagem("Erro ao gravar produto");
    });
  }

  pesquisa(argumento?: AbstractControl) {
    this.ocultaMensagem();

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
      }, error=> this.imprimeMensagem(`Erro ao pesquisar ${JSON.stringify(error)}`));
    this.logService.registra('Pesquisando');

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
      try {
        let selecionados = this.getProdutosSelecionados();
        this.listaService.adicionaItens(selecionados);
        this.router.navigate(['listas','nova']);
        return;
      } catch (error) {
        console.log(error);
        this.logService.registra(`Erro ao volta pra lista`);
        this.logService.registra(error);
      }
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
   // console.log('Executando teste');
    let itens = this.criaTeste();
    itens.subscribe( item => {
      console.log( item);
    });
  }

  buscaProdutos(item: string) {
    //console.log(`Buscando ${item}`);
    this.produtoService.pesquisa( item)
      .subscribe(produtos => this.produtosPesquisa = produtos);
  }

  autoCompleteSelecionado(valor) {
    //console.log(`Selecionado ${valor}`);
    this.formProduto.get('descricao').setValue(valor.descricao);
    this.produtos = this.getProdutosSelecionados();
    this.produtos.push(valor);
  }

}
