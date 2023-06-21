import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";


class ListCategoryController{
async handle (request: Request, response: Response){

    //inicializar o Service na Controller
    const listCategoryService = new ListCategoryService();

    //executar o serviço
    const category = await listCategoryService.execute();

    //retornar 
    return response.json(category);

}

}

export {ListCategoryController}