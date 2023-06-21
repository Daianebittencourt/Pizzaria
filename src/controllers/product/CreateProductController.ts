import { CreateProductService } from "../../services/product/CreateProductService";
import { Request, Response } from "express";

class CreateProductController {

    async handle(request: Request, response: Response) {

        const { name, price, description, category_id } = request.body;

        let banner = ' ';

        //conexão com a service
        const createProductService = new CreateProductService();

        //executar 
        const product = await createProductService.execute({
            name,
            price,
            description,
            banner,
            category_id,
        });

        return response.json(product);
    }

}

export { CreateProductController }