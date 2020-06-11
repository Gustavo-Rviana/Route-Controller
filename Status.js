"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.result = result !== null ? result : undefined;
    }
    /**
     * Transforma "this.result" em um retorno válido
     * Se o tipo de "this.result" for object, o corpo inteiro do objeto será retornado.
     * Se o tipo de "this.result" for string, será retornado um objeto parecido com { "message": "this.result" }.
     * Se "this.result" for definido, diferente de nulo e não atender as opções citadas, o retorno será { "result": "this.result" }.
     * Se "this.result" for nulo ou não definido, o resultado irá retornar undefined.
     */
    toBody() {
        if (this.result) {
            switch (typeof (this.result)) {
                case 'string':
                    return { "message": this.result };
                case 'object':
                    return this.result;
                default:
                    return { "result": this.result };
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
            if (reqObj.message) {
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
