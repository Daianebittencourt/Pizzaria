import {Request, Response} from 'express'
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCategoryController{
    async handle(request:Request, response:Response){
        const {name} = request.body;

        //conexão com a service
        const createCategoryService = new CreateCategoryService();

        //executar o serviço - cadastrar uma categoria 
        const category = await createCategoryService.execute({
            name: name,
        });
        return response.json(category);
    }
    }



export { CreateCategoryController }