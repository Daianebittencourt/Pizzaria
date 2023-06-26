import { Request, Response } from "express"
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController{
    async handle (request: Request, response: Response){
        //alteração de query para params - passar o id na rota
        const order_id = request.params.id as string;

        const detailOrderService = new DetailOrderService();

        const orders = await detailOrderService.execute({
            order_id,
        })

        return response.json(orders);
    }
}

export { DetailOrderController }