import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersController{
    async handle(request: Request, response: Response){

        //inicializando a service
        const listOrdersService = new ListOrdersService();

        //executando
        const orders = await listOrdersService.execute();

        return response.json(orders);
    } 

}

export { ListOrdersController }