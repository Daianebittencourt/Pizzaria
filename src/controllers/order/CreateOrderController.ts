import {Request, Response} from 'express'
import { CreateOrderService } from '../../services/order/CreateOrderService';

class CreateOrderController{

    async handle(request: Request, response: Response){
        const {table, name, user_id} = request.body;

        //conexão com a service
        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({
            table: table,
            name: name,
            user_id: user_id,
        });

        return response.json(order);
    }

}

export { CreateOrderController }