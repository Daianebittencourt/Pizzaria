import { Request, Response } from "express"
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {

    async handle(request: Request, response: Response) {
        //o controller pega os dados do body
        // repassando para a service fazer o contato com o banco de dados
        const { name, email, password } = request.body;
        //inicializa o serviço | instanciando a Service na Controller
        const createUserService = new CreateUserService();

        //executa o serviço - por exemplo, cadastrar
        //await é para esperar o execute e depois ir para a linha do return | executando o a create e o execute vem da Service para executar
        const user = await createUserService.execute({
            //o execute vai devolver no user
            name,
            email,
            password
        });
        //não está retornando a senha do usuário.
        return response.json({ user })
    }
}

export { CreateUserController }