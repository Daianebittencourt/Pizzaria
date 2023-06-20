import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController{
    async handle (request: Request, response: Response){
        const {email, password}=request.body; //solicitando e-mail e senha para login 

        const authUserService = new AuthUserService();  // inicializando a service 

        const auth = await authUserService.execute({
            email,
            password
        })

        return response.json(auth); // vai retornar o que foi armazenado na auth
    }


}

export { AuthUserController }