import { Request, Response } from "express"
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController{
    async handle(request: Request, response: Response){
        const order_id = request.params.id;

        // conexão com a service
        const sendOrderService = new SendOrderService();

        const order = await sendOrderService.execute({
            order_id
        });

        return response.json(order)

    }

}

export { SendOrderController }