import { Request, Response } from "express"
import { AddItemService } from "../../services/order/AddItemService"

class AddItemController{
    async handle (request: Request, response: Response){
        const {order_id, product_id, amount}=request.body;
        //conexão com a service 
        const addItemService = new AddItemService();

        const item = await addItemService.execute({
            order_id: order_id,
            product_id: product_id,
            amount: amount,
        });

        return response.json(item);

    }
}

export { AddItemController }