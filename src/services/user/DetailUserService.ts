import { prismaClient } from "../../prisma";

// detalhes do usuário
class DetailUserService {
  async execute(user_id: string) {
// vai buscar no banco de dados o primeiro id, se for igual ao que está sendo comparado 
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      select:{
        id: true,
        name: true,
        email: true,
      }
    })

    return user;
  }
}
//quando usar o "export default DetailUSerService;" | Xarlys explicou!
export { DetailUserService }; 
