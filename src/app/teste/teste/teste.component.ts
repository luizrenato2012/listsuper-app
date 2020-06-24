import { Component, OnInit } from '@angular/core';
import { TesteService } from '../teste.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  items : any[];
  keyword = 'nome';

  constructor(private service: TesteService) { }

  ngOnInit() {
    this.items = []
  }

  // do something with selected item
  selectEvent( item ) {
    console.log({item});
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

}
