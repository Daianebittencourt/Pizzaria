import { Request, Response } from 'express'
import { ListByCategoryService } from '../../services/product/ListByCategoryService';

class ListByCategoryController{
    async handle(request: Request, response:Response){
        //as informações serão enviadas por query | as - fornçando a tipagem afirmando a tipagem
        const category_id = request.query.category_id as string;

        //inicializando a service na Controller
        const listByCategoryService = new ListByCategoryService();

        //executando o serviço
        //todos os produtos dentro da categoria escolhida serão armazenados na variável products
        const products = await listByCategoryService.execute({
            category_id
        });

        return response.json(products);
           
     
    }
}

export { ListByCategoryController }