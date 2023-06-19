import { PrismaClient } from "@prisma/client"; //importando para fazer a utilização

const prismaClient = new PrismaClient(); //instanciando 

export default prismaClient; // exportando 

//- acessar o banco de dados e fazer alterações