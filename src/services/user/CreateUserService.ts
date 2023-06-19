import prismaClient from "../../prisma"; // para a conexão direta com o banco de dados 
import { hash } from "bcryptjs"; //utilizado para a criptografia da senha.

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}:UserRequest) { //quando executar vai fornecer o nome, email e senha do usuário

        //verificação de envio do e-mail
        if(!email){
            throw new Error ("E-mail incorreto! ")
        }

        // verificar se o email já está cadastrado
        const userAlreadyExists =await prismaClient.user.findFirst({
            where:{ //parâmetro para buscar
                email: email //vai verificar se o email digitado é igual ao que consta no banco e vai armazenar na userAlreadyExists 
            }
        }) //vai procurar e pegar o primeiro
        if (userAlreadyExists){
            throw new Error ("E-mail já está cadastrado. Entre com ele ou cadastre um novo e-mail.")
        }

        const passwordHash = await hash(password,8) // armazenando a senha criptografada no passwordHash | passando a senha e o 8 - parametro de criptografia

        //CADASTRAR USUÁRIO NO BANCO DE DADOS
        const user = await prismaClient.user.create({
            data:{ 
                name: name,
                email: email,
                password: passwordHash, //salvando a senha criptografada no banco de dados
            },
            select:{ //selecionar o que eu quero devolver (retorno)
                id: true,
                name: true,
                email: true,
            }
        })
            return user; //o que eu solicitar vai aparecer, por exemplo, aparece o nome do Json que foi preenchido no Insomnia 
    }
}

export { CreateUserService }