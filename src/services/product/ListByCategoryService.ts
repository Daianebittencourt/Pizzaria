import { prismaClient } from "../../prisma";

//tipando
interface ListProduct{
    category_id: string;
}
//vai precisar fornecer o ID da categoria 
class ListByCategoryService{
    async execute({category_id}: ListProduct){

        //buscando os produtos dessa categoria
        const findByCategory = await prismaClient.product.findMany({
            where:{
                category_id:category_id
            }
        })

        return findByCategory;
    }
}

export { ListByCategoryService }