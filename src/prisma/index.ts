//Xarlys, tentei fazer o import conforme o orientado, mas não vai
//o import aqui vem desse PrismaClient que é de uma dependência 
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient(); //instanciando 

// [ ] Dai o ideal é q vc não exporte defaul, pois para importar vc pode chamar como qualquer nome e vai funcionar
// o melhor é expotar sempre com o nome entre { } pois assim na hora de importar vc tem q usar o mesmo nome
// ex.: export { prismaClient } e na hora de importar import { prismaClient } from "./prisma"

//Xarlys, estava com dúvida nessa parte mesmo do default, mas a única diferença é essa explicada mesmo, né?
export { prismaClient }; 

//- acessar o banco de dados e fazer alterações