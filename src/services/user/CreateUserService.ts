// para a conexão direta com o banco de dados
import { prismaClient } from "../../prisma";
//utilizado para a criptografia da senha.
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

//quando executar vai fornecer o nome, email e senha do usuário
class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    //verificação de envio do e-mail
    if (!email) {
      throw new Error("E-mail incorreto! ");
    }

    // verificar se o email já está cadastrado
    //WHERE - parâmetro para buscar
    //email: email - vai verificar se o email digitado é igual ao que consta no banco e vai armazenar na userAlreadyExists
    //findFirst - vai procurar e pegar o primeiro
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) {
      throw new Error(
        "E-mail já está cadastrado. Entre com ele ou cadastre um novo e-mail."
      );
    }

    // armazenando a senha criptografada no passwordHash | dentro do hash - passando a senha e o 8 - parametro de criptografia
    const passwordHash = await hash(password, 8);

    //CADASTRAR USUÁRIO NO BANCO DE DADOS
    //passwordHash - salvando a senha criptografada no banco de dados
    //select - selecionar o que eu quero devolver (retorno)
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    //o que eu solicitar vai aparecer, por exemplo, aparece o nome do Json que foi preenchido no Insomnia
    return user;
  }
}

export { CreateUserService };
