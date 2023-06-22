import { Request, Response } from "express"
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

class DeleteOrderController{
    async handle(request: Request, response: Response){
        const order_id = request.query.order_id as string;

        //conexão com a service
        const deleteOrderService = new DeleteOrderService();

        const order = await deleteOrderService.execute({
            order_id
        });

return response.json(order);

    }
}

export { DeleteOrderController }