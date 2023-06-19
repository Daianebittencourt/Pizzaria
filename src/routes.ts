import { Router} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

//rotas USERS 
//bate na rota /users -> chama o controller
router.post('/users', new CreateUserController().handle) //instânciando o controller | handle para que serve? 

export{ router };