import prismaClient from "../../prisma";
import { compare } from "bcryptjs"; // para verificar se a senha está correta 
import { sign } from 'jsonwebtoken' //registar/gerar token

interface AuthRequest{ //vai solicitar o e-mail e senha para fazer login
    email: string;
    password: string;
}
    

class AuthUserService{ //para login/autenticação no sistema 
    async execute({email,password}: AuthRequest){
        
        //VERIFICAR SE O E-MAIL EXISTE
        const findUserByEmail = await prismaClient.user.findFirst({ 
            where:{
                email: email  //verificando se o e-mail é igual
            }

        })

        if(!findUserByEmail){ //se o e-mail não for igual, aí exibe a mensagem de erro
            throw new Error("Usuário ou senha incorreto!")
        }

        //VERIFICAR SE A SENHA ESTÁ CORRETA
        const passwordMatch = await compare(password,findUserByEmail.password) //comparando a senha | vai armazenar se está correta na variável passwordMatch

        if(!passwordMatch){ //se a senha não for igual vai gerar a mensagem de erro
            throw new Error ("Usuário ou senha incorreto!")
        }

         //gerando token para o usuário logado
         const token = sign(
            {
            name: findUserByEmail.id, //enviando para o payload | houve a busca do usuário na variável findUserByEmail
            email: findUserByEmail  //informações que vão ficar no token
        },

        process.env.JWT_SECRET, //secret key - foi criado uma hash e armazenada em uma variável ambiente no .env
        {//são options 
            subject: findUserByEmail.id, //estou pegando o id usuário e colocando no token
            expiresIn: '30d' //o token expira em 30d - alterar depois por questões de segurança.

        }
        
        )

        return{
            id: findUserByEmail.id,
            name: findUserByEmail.name,
            email: findUserByEmail.email,
            token: token,
        }

    }
}

export {AuthUserService};