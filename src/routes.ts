import { Router} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";


const router = Router();

const createUserController = CreateUserController; // verificar se está correto, mas está rodando e as rotas estão funcionando 
const authUserController = AuthUserController;
const detailUserController = DetailUserController;


//const createUserController = CreateUserController; // verificar se está correto, mas está rodando e as rotas estão funcionando 
//const authUserController = AuthUserController;


//rotas USERS 
//bate na rota /users -> chama o controller
//router.post('/users', new createUserController().handle) //instânciando o controller | handle para que serve?
 router.post('/users', new createUserController().handle)
//rota para logar usuário
router.post('/login', new authUserController().handle)

//rota para detalhes do usuário - vai chamar o middleware e vai executar
router.get('/detail', isAuthenticated, new detailUserController().handle) //buscando as informações - tipo get


export{ router };