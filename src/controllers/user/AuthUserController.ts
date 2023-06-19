import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController{
    async handle (req: Request, res: Response){
        const {email, password}=req.body; //solicitando e-mail e senha para login 

        const authUserService = new AuthUserService();  // inicializando a service 

        const auth = await authUserService.execute({
            email,
            password
        })

        return res.json(auth); // vai retornar o que foi armazenado na auth
    }


}

export { AuthUserController }