import { prismaClient } from "../../prisma";

// detalhes do usuário
class DetailUserService {
  async execute() {
    return { ok: true };
  }
}
//quando usar o "export default DetailUSerService;" | Xarlys explicou!
export { DetailUserService }; 
