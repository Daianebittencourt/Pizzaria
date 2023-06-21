// para verificar se a senha está correta
import { compare } from "bcryptjs";
//registar/gerar token
import { sign } from "jsonwebtoken";
import { prismaClient } from "../../prisma";

//vai solicitar o e-mail e senha para fazer login
interface AuthRequest {
  email: string;
  password: string;
}
//para login/autenticação no sistema
class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // [ ] Dai aqui vou te ensinar uma coisa nova, uma metodologia em ingles q esqueci o nome agora .. kkkkkkkk (normal vai se acostumando)
    //que em portugues seria algo como QUEBRE O MAIS RAPIDO POSSIVEL (BREAK AS SOON AS POSSIBLE)

    // CONSISTE EM FAZER TODAS A VALIDADES DE PRIMEIRA E SE ALGUMA DER ERRADO VC PARA A EXECUÇÃO E RETORNA O ERRO OU
    // NAO IRÁ PASSAR PARA O PRÓXIMO TRECHO DO CÓDIGO.
    // ISSO É MUITO UTILIZADO EM LINGUAGENS COMO JAVA, C# E ETC, MAS NO JS NAO É MUITO COMUM, MAS É UMA BOA PRÁTICA
    // ISSO FAZ COM QUE APÓS VC FAZER ESSA VALIDACAO VC SEMPRE TERÁ A CERTEZA QUE DALI PRA BAIXO SE VC PRECISAR
    // DESSA VARIAVEL ELA SEMPRE IRÁ EXISTIR, POIS VC JÁ FEZ A VALIDAÇÃO ANTES DE USAR E NAO PRECISARA DEPOIS DISSO SE PREOCUPAR SE ELA EXISTE OU NAO

    // Dai o ideal é q vc nao use o if e else, pois se vc usar o else vc terá q fazer a validação novamente, ficará assim.
    if (!email) {
      throw new Error("Usuário ou senha incorreto!");
    }

    if (!password) {
      throw new Error("Usuário ou senha incorreto!");
    }

    // SÓ ISSO..AJSDKFJASLKDFJSKLD, FOI MAIS DIFICL EXPLICAR DO QUE FAZER...
    // TODAVIA DAQUI PRA BAIXO VC PODERÁ USAR TRANQUILAMENTE SEM SE PREOCUPAR SE EXISTE OU NAO A VARIAVEL E SE ELA IRÁ CHEGAR ATÉ A PROXIMA CAMADA
    // POIS A VALIDACAO JÁ ESTÁ FEITA, ENT SE NAO EXISTIR ESSA VARIAVEL O ERRO SERÁ LANÇADO PARA QUEM ESTIVER CONSUMINDO A API

    // EXISTE UMA OUTRA COISA ENVOLVENDO SEGURANDO QUE QUANDO É LOGIN NAO DEIXAR CLARO PARA PESSOA O Q ESTÁ ERRADO, MAS É CENA PARA OS PRÓXIMOS CAPITULOS
    // MAS SE VC QUISER PODE FAZER UM IF E ELSE AQUI E LANÇAR O ERRO DESSA FORMA

    // UMA OUTRA COISA, MAS É ALGO MAIS MEU MESMO...PARTICULARMENTE PREFIRO QUE OS COMENTÁRIOS FIQEM EM CIMA DO TRECHO DO CÓDIGO E NAO NA MESMA LINHA
    // ASSIM A PESSOAL LE O COMENTÁRIO ANTES DE LER O CÓDIGO E TAMBÉM EVITA A QUEBRA DO TRECHO DO CÓDIGO EM QUESTAO.
    // Troquei !findUserByEmail acredito que seja mais legivel assim, mas como disse é algo mais meu, fica a teu critério.

    // pronto acho q por hoje 20/06 é só, cansei..asjdflkajsdfklasjdkfalsda

    //VERIFICAR SE O E-MAIL EXISTE
    const findUserByEmail = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    //se o e-mail não for igual, aí exibe a mensagem de erro
    if (!findUserByEmail) {
      throw new Error("Usuário ou senha incorreto!");
    }

    //VERIFICAR SE A SENHA ESTÁ CORRETA
    //comparando a senha | vai armazenar se está correta na variável passwordMatch
    const passwordMatch = await compare(password, findUserByEmail.password);

    //se a senha não for igual vai gerar a mensagem de erro
    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorreto!");
    }

    //gerando token para o usuário logado
    const token = sign(
      //enviando para o payload | houve a busca do usuário na variável findUserByEmail
      //informações que vão ficar no token
      {
        name: findUserByEmail.id,
        email: findUserByEmail,
      },

      //secret key - foi criado uma hash e armazenada em uma variável ambiente no .env
      process.env.JWT_SECRET,

      //são options
      //estou pegando o id usuário e colocando no token
      //o token expira em 30d - alterar depois por questões de segurança.
      {
        subject: findUserByEmail.id,
        expiresIn: "30d",
      }
    );

    return {
      id: findUserByEmail.id,
      name: findUserByEmail.name,
      email: findUserByEmail.email,
      token: token,
    };
  }
}

export { AuthUserService };
