 import {prismaClient} from "../../prisma";

 class ListCategoryService{
    async execute(){

        //vai pegar todas as categorias do banco de dados com o findMany 
            const category = await prismaClient.category.findMany({
                select:{
                    id:true,
                    name: true,
                }
            })

            return category;
    }
    
    
 }

 export {ListCategoryService}