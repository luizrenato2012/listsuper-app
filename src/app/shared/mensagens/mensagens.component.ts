import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mensagens',
  template : `<div style="margin-top: 5px">
              <div class="alert alert-primary texto" role="alert" *ngIf="texto!=''">
                  {{ texto }}
              </div>
            </div> `,
  styles : [`
    .texto {
      margin-top: 0px; margin-bottom: 10px;
      color: black;
    }
    `]
})
export class MensagensComponent implements OnInit {

  @Input()
  texto="";
  constructor() { }

  ngOnInit() {
  }

}
