import { Request, Response } from "express"
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {

    async handle (request: Request, response: Response){
        //o controller pega os dados do body
        const {name, email, password} = request.body; // repassando para a service fazer o contato com o banco de dados
        //inicializa o serviço
        const createUserService = new CreateUserService(); //instanciando a Service na Controller
        //executa o serviço - por exemplo, cadastrar
        const user = await createUserService.execute({ //await é para esperar o execute e depois ir para a linha do return | executando o a create e o execute vem da Service para executar
            //o execute vai devolver no user
            name,
            email,
            password
        }); 
        
        return response.json({user}) //não está retornando a senha do usuário.
    }
}

export { CreateUserController }