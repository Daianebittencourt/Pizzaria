import { Request, Response } from "express";
import { DeleteItemService } from "../../services/order/DeleteItemService";


class DeleteItemController{
    async handle(request: Request, response: Response){
        const item_id = request.query.item_id as string;

        //conexão com a service
        const deleteItemService = new DeleteItemService();

        const item = await deleteItemService.execute({
            item_id
        })

        return response.json(item)

    }
}

export { DeleteItemController }
