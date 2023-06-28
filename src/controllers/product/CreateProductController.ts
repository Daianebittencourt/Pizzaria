import { CreateProductService } from "../../services/product/CreateProductService";
import { Request, Response } from "express";

class CreateProductController {

    async handle(request: Request, response: Response) {

        const { name, price, description, category_id } = request.body; //era body


        //conexão com a service
        const createProductService = new CreateProductService();

        //o produto necessita de foto para ser cadastrado
        if (!request.file) {
            throw new Error("Erro ao enviar foto!")
        } else {

            const { originalname, filename: banner } = request.file;


            //executar 
            const product = await createProductService.execute({
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
            });

            return response.json(product);
        }
    }

}

export { CreateProductController }