import { Router} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();

//rotas USERS 
//bate na rota /users -> chama o controller
router.post('/users', new CreateUserController().handle) //instânciando o controller | handle para que serve?
 
//rota para logar usuário
router.post('/login', new AuthUserController().handle)

export{ router };