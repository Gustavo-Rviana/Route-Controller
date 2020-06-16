/**
 * Classe utilizada para retornar o estado da conexão
 */
export declare class Status {
    /**
     * Código do estado
     */
    code: number;
    /**
     * Resultado que deve ser enviado pela conexão
     */
    result: any;
    /**
     * Inicializa a classe
     * @param code Código de retorno (http code)
     * @param result Objeto que deve ser enviado na conexão
     */
    constructor(code: number, result?: any);
    /**
     * Transforma "this.result" em um retorno válido
     * Se o tipo de "this.result" for object, o corpo inteiro do objeto será retornado.
     * Se o tipo de "this.result" for string, será retornado um objeto parecido com { "message": "this.result" }.
     * Se "this.result" for definido, diferente de nulo e não atender as opções citadas, o retorno será { "result": "this.result" }.
     * Se "this.result" for nulo ou não definido, o resultado irá retornar undefined.
     */
    toBody(): object;
    /**
     * Recupera o objeto enviado pela conexão e o transforma em um objeto válido do "State.result"
     * @param reqObj Objeto retornado pela conexão
     */
    static parseStatusResult(reqObj: any): any;
}
