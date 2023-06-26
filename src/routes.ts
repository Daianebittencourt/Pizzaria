import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from './config/multer'

import multer from 'multer';
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { DeleteItemController } from "./controllers/order/DeleteItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();

// Dai N estava correto - FIZ A CORREÇAO PRA VC
// [X] adicionei o new para instanciar o controller e depois removi ele da rota e chamei apenas o metodo.
const createUserController = new CreateUserController(); // verificar se está correto, mas está rodando e as rotas estão funcionando 
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const createProductController = new CreateProductController();
const listByCategoryController = new ListByCategoryController();
const createOrderController = new CreateOrderController();
const deleteOrderController= new DeleteOrderController();
const addItemController = new AddItemController();
const deleteItemController = new DeleteItemController();
const sendOrderController = new SendOrderController();
const listOrdersController = new ListOrdersController();
const detailOrderController= new DetailOrderController();
const finishOrderController = new FinishOrderController();

//configuração 
const upload = multer(uploadConfig.upload("./tmp"))
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


//ROTAS PRODUCT
//rota para cadastrar um produto
//single - pois só vai aceitar um arquivo
router.post('/product', isAuthenticated, upload.single('file'), createProductController.handle)

//rota para ver os produtos de determinada categoria
router.get('/list/product', isAuthenticated, listByCategoryController.handle)

//ROTAS ORDER
//cadastro de uma order
router.post('/order', isAuthenticated, createOrderController.handle)

//rota para deletar uma order
router.delete('/delete/order', isAuthenticated, deleteOrderController.handle)

//rota para criar um item
router.post('/item', isAuthenticated, addItemController.handle)

//rota para deletar um item da order - mesa
router.delete('/delete/item', isAuthenticated, deleteItemController.handle)

//rota para atualizar status do pedido
router.put('/send/order', isAuthenticated, sendOrderController.handle)

//listar os pedidos que foram finalizados
router.get('/list/orders', isAuthenticated, listOrdersController.handle)

// detalhes dos produtos
//http://localhost:3333/detail/orders/4c08e976-d9f8-4a9d-9c02-4de965d91bd1
router.get('/detail/orders/:id', isAuthenticated, detailOrderController.handle )

//atualizar o status do pedido - cozinha confirmando que o pedido está pronto
router.put('/finish', isAuthenticated, finishOrderController.handle )

export { router };