import { Observable } from 'rxjs';
import { ConnectionFactory } from './ConnectionFactory';
import { LogService } from 'src/app/shared/log.service';

export class DatabaseService{

    constructor(private factory : ConnectionFactory,
                private logService: LogService){}

    private storeName : string;

    public setStoreName(nome: string) {
        this.storeName = nome;
    }

    listaTodos () {
        return new Observable<any[]> ( observer => {
            if (!this.storeName) {
                observer.error(`Sem nome de store definido`);
            }

            this.factory.getConnection().subscribe( connection => {
                let objectStore = connection
                    .transaction(this.storeName, 'readonly')
                    .objectStore(this.storeName);
    
                let resultado = objectStore.getAll();

                resultado.addEventListener('success', ()=> {
                    observer.next(resultado.result);
                });

                resultado.addEventListener('error', (error)=>{
                    console.log(`Erro ao listar ${JSON.stringify(error)}`);
                    this.logService.registra(`Erro ao listar ${this.storeName}: ${JSON.stringify(error)}`);
                    observer.error(error);
                });
            }, error =>{
                observer.error(`Erro ao conectar ${this.storeName} - ${error}`);
            });
        });
    }

    /** pesquisa por parte de string */
    pesquisaPorCampoTexto (campo: string, valor: string) {

        return new Observable<any[]> ( observer => {
            if (!this.storeName) {
                observer.error(`Sem nome de store definido`);
            }

            this.factory.getConnection().subscribe( connection => {
                let resultSet = connection
                    .transaction(this.storeName, 'readonly')
                    .objectStore(this.storeName)
                    .getAll();

                resultSet.addEventListener('success', ()=> {
                    let resultado = resultSet.result.filter( 
                        registro => registro[campo].toLowerCase().startsWith(valor.toLocaleLowerCase()));
                    observer.next(resultado);
                });

                resultSet.addEventListener('error', (error)=>{
                    console.log(`Erro ao listar ${JSON.stringify(error)}`);
                    this.logService.registra(`Erro ao listar ${this.storeName}: ${JSON.stringify(error)}`);
                    observer.error(error);
                });
            }, error =>{
                observer.error(`Erro ao conectar ${this.storeName} - ${error}`);
            });
        });
    }

    pesquisaPorId (id : number) {

        return new Observable<any[]> ( observer => {
            if (!this.storeName) {
                observer.error(`Sem nome de store definido`);
            }

            if (!id) {
                observer.error('Id invalidao');
            }

            this.factory.getConnection().subscribe( connection => {
                let resultSet = connection
                    .transaction(this.storeName, 'readonly')
                    .objectStore(this.storeName)
                    .get(id);

                resultSet.addEventListener('success', ()=> {
                    let resultado = resultSet.result;
                    observer.next(resultado);
                });

                resultSet.addEventListener('error', (error)=>{
                    console.log(`Erro ao listar ${JSON.stringify(error)}`);
                    this.logService.registra(`Erro ao listar ${this.storeName}: ${JSON.stringify(error)}`);
                    observer.error(error);
                });
            }, error =>{
                observer.error(`Erro ao conectar ${this.storeName} - ${error}`);
            });
        });
    }

    inclui(objeto: any) {
        return new Observable ( observer=>{
            if (!this.storeName) {
                observer.error(`Sem nome de store definido`);
            }

            this.factory.getConnection().subscribe( connection => {
                let request = connection
                    .transaction([this.storeName], 'readwrite')
                    .objectStore(this.storeName)
                    .add(objeto);

                request.addEventListener('success', (evt: any)=> {
                    console.log(`Objeto criado id: ${JSON.stringify(evt.target.result)}`);
                    // console.log(evt);
                    observer.next(evt.target.result);
                });

                request.addEventListener('error', (error)=>{
                    console.log(`Erro ao incluir ${this.storeName}: ${JSON.stringify(error)}`);
                    this.logService.registra(`Erro ao incluir ${this.storeName}: ${JSON.stringify(error)}`);
                    observer.error(error);
                });
            });
        });
    }

    /** inclui ou altera objeto */
    grava(objeto: any) {
        return new Observable ( observer=>{
            if (!this.storeName) {
                observer.error(`Sem nome de store definido`);
            }

            this.factory.getConnection().subscribe( connection => {
                let request = connection
                    .transaction([this.storeName], 'readwrite')
                    .objectStore(this.storeName)
                    .put(objeto);

                request.addEventListener('success', (evt)=> {
                    console.log(`${JSON.stringify(evt)}`);
                    observer.next(`Objeto cadastrado com sucesso.`);
                });

                request.addEventListener('error', (error)=>{
                    console.log(`Erro ao incluir ${this.storeName}: ${JSON.stringify(error)}`);
                    this.logService.registra(`Erro ao incluir ${this.storeName}: ${JSON.stringify(error)}`);
                    observer.error(error);
                });
                
            });
        });
    }

    incluiLista(lista: any[]) {
        return new Observable ( observer=>{
            if (!this.storeName) {
                observer.error(`Sem nome de store definido`);
            }

            this.factory.getConnection().subscribe( connection => {
                let objectStore = connection
                    .transaction([this.storeName], 'readwrite')
                    .objectStore(this.storeName);

                let request = null;

                lista.forEach( objeto =>  {
                    request =  objectStore.add(objeto);
                    request.addEventListener('success', ()=> {
                        observer.next(`Objeto cadastrado com sucesso.`);
                    });
                    
                    request.addEventListener('error', (error)=>{
                        console.log(`Erro ao incluir ${this.storeName}: ${JSON.stringify(error)}`);
                        this.logService.registra(`Erro ao incluir ${this.storeName}: ${JSON.stringify(error)}`);
                        observer.error(error);
                    });
                });
                observer.complete();

            });
        });
    }

    exclui(id: number) {
        return new Observable ( observer=>{
            if (!this.storeName) {
                observer.error(`Sem nome de store definido`);
            }

            this.factory.getConnection().subscribe( connection => {
                let request = connection
                    .transaction([this.storeName], 'readwrite')
                    .objectStore(this.storeName)
                    .delete(id);

                request.addEventListener('success', ()=> {
                    observer.next(`Objeto excluido com sucesso.`);
                });

                request.addEventListener('error', (error)=>{
                    console.log(`Erro ao exclui ${this.storeName}: ${JSON.stringify(error)}`);
                    this.logService.registra(`Erro ao exclui ${this.storeName}: ${JSON.stringify(error)}`);
                    observer.error(error);
                });
            });
        });
    }

    esvazia() {
        return new Observable ( observer=>{
            if (!this.storeName) {
                observer.error(`Sem nome de store definido`);
            }

            this.factory.getConnection().subscribe( connection => {
                let request = connection
                    .transaction([this.storeName], 'readwrite')
                    .objectStore(this.storeName)
                    .clear();

                request.addEventListener('success', ()=> {
                    observer.next(`Store ${this.storeName} esvaziada com sucesso.`);
                });

                request.addEventListener('complete', ()=> {
                    observer.complete();
                });

                request.addEventListener('error', (error)=>{
                    console.log(`Erro ao store ${this.storeName}: ${JSON.stringify(error)}`);
                    this.logService.registra(`Erro ao esvaziar ${this.storeName}: ${JSON.stringify(error)}`);
                    observer.error(error);
                });
            });
        });
    }

    altera(objeto: any){
        return new Observable ( observer=>{
            if (!this.storeName) {
                observer.error(`Sem nome de store definido`);
            }

            this.factory.getConnection().subscribe( connection => {
                this.processaAlteracao(connection, objeto, observer);
            });
        });
    }

    private processaAlteracao(connection, objeto, observer) {
        let request = connection
            .transaction([this.storeName], 'readwrite')
            .objectStore(this.storeName)
            .put(objeto);

        request.addEventListener('success', (evt:any)=> {
            observer.next(`Objeto cadastrado com sucesso.`);
        });

        request.addEventListener('error', (error)=>{
            console.log(`Erro ao incluir ${this.storeName}: ${JSON.stringify(error)}`);
            this.logService.registra(`Erro ao incluir ${this.storeName}: ${JSON.stringify(error)}`);
            observer.error(error);
        });
    }
}
