import prismaClient from "../../prisma";
import { compare } from "bcryptjs"; // para verificar se a senha está correta 

interface AuthRequest{ //vai solicitar o e-mail e senha para fazer login
    email: string;
    password: string;
}
    

class AuthUserService{ //para login/autenticação no sistema 
    async execute({email,password}: AuthRequest){
        
        //VERIFICAR SE O E-MAIL EXISTE
        const user = await prismaClient.user.findFirst({
            where:{
                email: email  //verificando se o e-mail é igual
            }

        })

        if(!user){ //se o e-mail não for igual, aí exibe a mensagem de erro
            throw new Error("Usuário ou senha incorreto!")
        }

        //VERIFICAR SE A SENHA ESTÁ CORRETA
        const passwordMatch = await compare(password,user.password) //comparando a senha | vai armazenar se está correta na variável passwordMatch

        if(!passwordMatch){ //se a senha não for igual vai gerar a mensagem de erro
            throw new Error ("Usuário ou senha incorreto!")
        }

        return{ok: true}

    }
}

export {AuthUserService};