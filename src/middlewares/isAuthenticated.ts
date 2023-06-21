import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

//tipando 
// no sub tem o ID do usuário - foi injetado anteriormente o id do usuário
interface Payload {
    sub: string;
}

export function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    //para receber o token
    const authToken = request.headers.authorization; //pegando o token atraves de uma requisição no cabeçalho e detro da authorization 

    // se não tiver o token | recebe a resposta status 401 - não autorizado
    if (!authToken) {
        return response.status(401).end();
    }
    //pegando apenas o token - quando a requisição é feita no insominia fica um espaço entre o Bearer e o token
    //a , dentro do [] é para ignorar o primeiro e nomear o segundo como token 
    // split função do JavaScript para separar o que está entre espaços
    const [, token] = authToken.split(" ")

    try {
        //validar o token
        //sub - é o id do usuário - vem do Payload
        //as - afirmando que vai devolver o Payload
        //next - vai prosseguir com a requisição após validação do token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET

        ) as Payload;

            //armazenando o ID do user que passar pelas rotas internas na variável user_id dentro do Request
            //precisa fazer a tipagem no request
            request.user_id = sub;

        return next();

        //barrando se der algum erro no token
    } catch (err) {
        return response.status(401).end();
    }


}

