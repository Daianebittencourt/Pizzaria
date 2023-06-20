import { PrismaClient } from "@prisma/client"; //importando para fazer a utilização

const prismaClient = new PrismaClient(); //instanciando 

// [ ] Dai o ideal é q vc não exporte defaul, pois para importar vc pode chamar como qualquer nome e vai funcionar
// o melhor é expotar sempre com o nome entre { } pois assim na hora de importar vc tem q usar o mesmo nome
// ex.: export { prismaClient } e na hora de importar import { prismaClient } from "./prisma"
export default prismaClient; // exportando 

//- acessar o banco de dados e fazer alterações