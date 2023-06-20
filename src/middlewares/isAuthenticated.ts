import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface Payload { //tipando 
    sub: string; // no sub tem o ID do usuário - foi injetado anteriormente o id do usuário
}

export function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    //para receber o token
    const authToken = request.headers.authorization; //pegando o token atraves de uma requisição no cabeçalho e detro da authorization 

    if (!authToken) { // se não tiver o token
        return response.status(401).end(); //recebe a resposta status 401 - não autorizado 
    }
    //pegando apenas o token - quando a requisição é feita no insominia fica um espaço entre o Bearer e o token
    //a , dentro do [] é para ignorar o primeiro e nomear o segundo como token 
    const [, token] = authToken.split(" ") // split função do JavaScript para separar o que está entre espaços

    try {
        //validar o token
        const {sub} = verify( //sub é o id do usuário - vem do Payload
            token,
            process.env.JWT_SECRET

        ) as Payload; //as afirmando que vai devolver o Payload
        return next(); // vai prosseguir com a requisição após validação do token

    } catch (err) {
        return response.status(401).end(); //barrando se der algum erro no token
    }


}

