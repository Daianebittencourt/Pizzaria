import { Router} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// Dai N estava correto - FIZ A CORREÇAO PRA VC
// [X] adicionei o new para instanciar o controller e depois removi ele da rota e chamei apenas o metodo.
const createUserController = new CreateUserController(); // verificar se está correto, mas está rodando e as rotas estão funcionando 
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();


//const createUserController = CreateUserController; // verificar se está correto, mas está rodando e as rotas estão funcionando 
//const authUserController = AuthUserController;


//rotas USERS 
//bate na rota /users -> chama o controller
//router.post('/users', new createUserController().handle) //instânciando o controller | handle para que serve?
 router.post('/users', createUserController.handle)
//rota para logar usuário
router.post('/login', authUserController.handle)

//rota para detalhes do usuário - vai chamar o middleware e vai executar
router.get('/detail', isAuthenticated, detailUserController.handle) //buscando as informações - tipo get


export{ router };