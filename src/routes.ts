import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();

// Dai N estava correto - FIZ A CORREÇAO PRA VC
// [X] adicionei o new para instanciar o controller e depois removi ele da rota e chamei apenas o metodo.
const createUserController = new CreateUserController(); // verificar se está correto, mas está rodando e as rotas estão funcionando 
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();

//ROTAS USERS - utilizada para cadastrar usuário
//bate na rota /users -> chama o controller
//rota para cadastrar usuário
router.post('/users', createUserController.handle)

//rota para logar usuário - tipo post
router.post('/login', authUserController.handle)

//rota para detalhes do usuário - vai chamar o middleware para essa rota interna e vai executar
//buscando as informações - tipo get
router.get('/detail', isAuthenticated, detailUserController.handle) 


//ROTAS CATEGORY 
//rota para cadastrar uma categoria 
router.post('/category', isAuthenticated, createCategoryController.handle)

//rota para listar todas as categorias
router.get('/list/category', isAuthenticated, listCategoryController.handle)

export { router };