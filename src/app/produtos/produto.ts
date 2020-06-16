
export class Produto {
    id: number;
    descricao: string;
    selecionado: boolean;

    constructor(id: number, descricao: string) {
        this.id = id;
        this.descricao = descricao;
        this.selecionado = false;
    }

}