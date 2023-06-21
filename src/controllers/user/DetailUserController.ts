import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

// classe detalhe do usuário
//método
//chamou a variável da service aqui
class DetailUserController {
    async handle(request: Request, response: Response) {

const user_id = request.user_id;

        const detailUserService = new DetailUserService();

        // vai retornar o execute da service que vai ser armazenada na user
        const userDetail = await detailUserService.execute(user_id);

        return response.json(userDetail);

    }
}
//exportando a classe
export { DetailUserController } 