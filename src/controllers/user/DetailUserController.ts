import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController{ // classe detalhe do usuário
    async handle (request: Request, response: Response){ //método
        const detailUserService = new DetailUserService(); //chamou a variável da service aqui
    
        const userDetail = await detailUserService.execute(); // vai retornar o execute da service que vai ser armazenada na user

        return response.json(userDetail); 

    }
}

export {DetailUserController} //exportando a classe