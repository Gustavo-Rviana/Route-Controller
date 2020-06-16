"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
/**
 * Classe utilizada para retornar o estado da conexão
 */
class Status {
    /**
     * Inicializa a classe
     * @param code Código de retorno (http code)
     * @param result Objeto que deve ser enviado na conexão
     */
    constructor(code, result) {
        this.code = code;
        this.result = result;
    }
    /**
     * Transforma "this.result" em um retorno válido
     * Se o tipo de "this.result" for object, o corpo inteiro do objeto será retornado.
     * Se o tipo de "this.result" for string, será retornado um objeto parecido com { "message": "this.result" }.
     * Se "this.result" for definido, diferente de nulo e não atender as opções citadas, o retorno será { "result": "this.result" }.
     * Se "this.result" for nulo ou não definido, o resultado irá retornar undefined.
     */
    toBody() {
        const type = typeof (this.result); //Type of result
        if (this.result !== undefined) {
            if (type === 'object' && this.result !== null) {
                return this.result;
            }
            else {
                return { [type === 'string' ? 'message' : "result"]: this.result };
            }
        }
        return undefined;
    }
    /**
     * Recupera o objeto enviado pela conexão e o transforma em um objeto válido do "State.result"
     * @param reqObj Objeto retornado pela conexão
     */
    static parseStatusResult(reqObj) {
        if (reqObj) {
            if (typeof (reqObj.message) === 'string') {
                return reqObj.message;
            }
            else if (reqObj.result) {
                return reqObj.result;
            }
            return reqObj;
        }
        return undefined;
    }
}
exports.Status = Status;
