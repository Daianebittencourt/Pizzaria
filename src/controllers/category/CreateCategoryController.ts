import {Request, Response} from 'express'
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

//no lugar da class utilizar o export default CreateCategoryController{
class CreateCategoryController{
    async handle(request:Request, response:Response){

/* #swagger.parameters['parameterName'] = {
        in: <string>,
        description: <string>,
        required: <boolean>,
        type: <string>,
        format: <string>,
        schema: <array>, <object> or <string>
} */

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