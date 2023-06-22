import { prismaClient } from "../../prisma";

//tipando
interface OrderRequest{
    table: number;
    name: string;
    user_id: string;
}

class CreateOrderService{
    async execute({table, name, user_id}: OrderRequest ){

//criando a order
        const order = await prismaClient.order.create({
            data:{
                table: table,
                name: name,
                user_id: user_id,
            }
        })

        return order;

    }

}

export { CreateOrderService }