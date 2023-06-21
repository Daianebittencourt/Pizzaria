import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

//solicitando e-mail e senha para login | linha 7
class AuthUserController{
    async handle (request: Request, response: Response){
        const {email, password}=request.body; 

        // inicializando a service 
        const authUserService = new AuthUserService();  

        const auth = await authUserService.execute({
            email,
            password
        })

        // vai retornar o que foi armazenado na auth
        return response.json(auth); 
    }


}

export { AuthUserController }