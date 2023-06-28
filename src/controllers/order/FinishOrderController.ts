import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController{
    async handle(request: Request, response: Response){
        //vai mandar no corpo da requisição JSON
        const order_id = request.params.id;

        //inicializando a Service
        const finishOrderService = new FinishOrderService();

        // executando
        const order = await finishOrderService.execute({
            order_id
        });
        
        return response.json(order)

    }
}

export { FinishOrderController }