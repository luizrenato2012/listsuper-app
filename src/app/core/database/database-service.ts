import { Observable } from 'rxjs';
import { ConnectionFactory } from './ConnectionFactory';
import { LogService } from 'src/app/shared/log.service';

export class DatabaseService{

    contador = 0;

    constructor(private factory : ConnectionFactory,
                private logService: LogService){
                    ++this.contador;
                    console.log("Criando DatabaseService "+ this.contador);
                }

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

                request.addEventListener('success', ()=> {
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
}
