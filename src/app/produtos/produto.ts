
export class Produto {
    id: number;
    descricao: string;
    selecionado: boolean;

    constructor( descricao: string, id?: number,) {
        this.id = id;
        this.descricao = descricao;
        this.selecionado = false;
    }

}