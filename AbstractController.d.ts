import { Request, Response, RequestHandler } from "express";
import { Status } from "./Status";
/**
 * Classe responsável por processar as informações da rota e autenticar a conexão (se necessário)
 */
export declare abstract class AbstractController<T> {
    /**
     * Responsável por informar ao controlador se a conexão deve estar autenticada
     */
    readonly needAuth: boolean;
    /**
     * Inicializa o construtor
     * @param needAuth Informa ao controlador se a conexão deve estar autenticada
     */
    constructor(needAuth: boolean);
    /**
     * Executa a rota com as configurações iniciais (como autenticação por exemplo) já processadas
     * @param req Requisição feita pelo usuário
     * @param res Resposta que deve ser enviada pelo usuário (normalmente não é usado por conta do retorno de um "Status")
     * @param auth Autenticação da conexão
     */
    abstract onRouteCalled(req: Request, res: Response, auth: T): Promise<Status>;
    /**
     * Função chamada pelo controlador quando ocorre um erro não manipulado
     * @param error Erro detectado
     * @param res Resposta que deve ser enviada para o usuário
     */
    abstract onNoHandledError(error: Error, res: Response): void;
    /**
     * Autentica a requisição
     * @param req Requisição contendo os dados da autenticação
     */
    abstract authenticate(req: Request): Promise<T>;
    /**
     * Transforma o controller em um middleware
     * @param handler Nome do handler que será executado. (O handler será iniciado com as mesmas configurações de "onRouteCalled")
     */
    configure(handlerName?: string): RequestHandler;
}
/**
 * Envia o objeto "status" como resposta (se o objeto for nulo, um código 500 junto com a mensagem "Internal server error" será enviado para a conexão)
 * @param res Resposta para o usuário
 * @param status Status que deve ser enviado para o usuário (se for um número, uma mensagem de status também será enviada)
 * @param alertClosedConnection Envia ao terminal o aviso de que houve uma tentativa de enviar uma resposta para uma conexão finalizada
 */
export declare function sendStatus(res: Response, status: Status | number, alertClosedConnection?: boolean): void;
