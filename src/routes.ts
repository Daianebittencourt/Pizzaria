import { Router} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();
const createUserController = CreateUserController; // verificar se está correto, mas está rodando e as rotas estão funcionando 
const authUserController = AuthUserController;

//rotas USERS 
//bate na rota /users -> chama o controller
router.post('/users', new createUserController().handle) //instânciando o controller | handle para que serve?
 
//rota para logar usuário
router.post('/login', new authUserController().handle)

export{ router };