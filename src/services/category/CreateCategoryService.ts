import {prismaClient} from "../../prisma";
//tipando 
interface CreateCategory{
    name: string;
}

//a tipagem entra no execute
class CreateCategoryService{
    async execute({name}: CreateCategory){
        if(name === " "){
            throw new Error ("Nome da categoria inválida!")
        }

        const category = await prismaClient.category.create({
            data:{
                name: name,
            },
            select:{
                id: true,
                name: true,
            }
        })

        return category;
    }

}
export { CreateCategoryService };