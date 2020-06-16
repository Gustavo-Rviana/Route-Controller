"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendStatus = exports.AbstractController = void 0;
const Status_1 = require("./Status");
const statuses_1 = __importDefault(require("statuses"));
/**
 * Classe responsável por processar as informações da rota e autenticar a conexão (se necessário)
 */
class AbstractController {
    /**
     * Inicializa o construtor
     * @param needAuth Informa ao controlador se a conexão deve estar autenticada
     */
    constructor(needAuth) {
        this.needAuth = needAuth;
    }
    /**
     * Transforma o controller em um middleware
     */
    configure() {
        /* Cria a variável que permite recuperar o controlador dentro da rota */
        const me = this;
        /**
         * Cria um middleware para processar as informações do controller
         * @param req Requisição enviada pela conexão
         * @param res Resposta que deve ser enviada para a conexão
         */
        return (req, res) => {
            /**
             * Cria uma função assíncrona que processa os dados do controlador
             */
            (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    //Cria uma variável responsável por armazenar a autenticação da conexão
                    var auth = null;
                    //Verifica se a rota precisa estar autenticada
                    if (me.needAuth) {
                        //Autentica a conexão
                        auth = yield me.authenticate(req);
                        //Verifica se a conexão foi autenticada
                        if (!auth) {
                            //Envia a conexão que é preciso estar autenticado
                            res.status(401).json({ "message": statuses_1.default[401] });
                            return;
                        }
                    }
                    //Executa a rota e envia o resultado para a conexão
                    sendStatus(res, yield me.onRouteCalled(req, res, auth), false);
                }
                catch (error) {
                    //Se houver um erro, executa onNoHandledError para processar o erro da rota
                    me.onNoHandledError(error, res);
                }
            }))().then();
        };
    }
}
exports.AbstractController = AbstractController;
/**
 * Envia o objeto "status" como resposta (se o objeto for nulo, um código 500 junto com a mensagem "Internal server error" será enviado para a conexão)
 * @param res Resposta para o usuário
 * @param status Status que deve ser enviado para o usuário (se for um número, uma mensagem de status também será enviada)
 * @param alertClosedConnection Envia ao terminal o aviso de que houve uma tentativa de enviar uma resposta para uma conexão finalizada
 */
function sendStatus(res, status, alertClosedConnection = true) {
    //Verifica se a conexão foi encerrada
    if (res.finished) {
        //Verifica se um aviso deve ser enviada ao console
        if (alertClosedConnection) {
            //Envia um aviso ao console
            console.warn('AVISO: Houve uma tentativa de envio de resposta para uma conexão fechada!');
        }
        return;
    }
    if (typeof (status) === 'number') {
        status = new Status_1.Status(status, statuses_1.default[status]);
    }
    else {
        //Verifica se "status" é inválido
        if (!status || typeof (status.code) !== 'number') {
            //Substitui o status por um status de erro interno "500"
            status = new Status_1.Status(500, statuses_1.default[500]);
        }
    }
    //Envia o estado para a conexão
    res.status(status.code).json(status.toBody());
}
exports.sendStatus = sendStatus;
