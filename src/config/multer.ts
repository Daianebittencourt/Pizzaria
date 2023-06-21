//CRIANDO DESTINO E NOME PARA SALVAR O ARQUIVO - EVITAR A REPETIÇÃO
//Após tratativa aqui - ir para routers
// para a imgame não se repetir
import crypto from 'crypto';
import multer from 'multer';

//para pegar os caminhos
import { extname, resolve } from 'path';

//vai fornecer a pasta onde quer salvar o arquivo
export default {
    upload(folder: string) {
        //quando acessar - dar o retorno 
        return {
            storage: multer.diskStorage({
                //destino em que a foto será salva | irname - diretório onde estou
                destination: resolve(__dirname, '..', '..', folder),
            //para não ter conflito de nome relacionado aos arquivos de foto
            //está disponível na documentação do multer
                filename: (request, file, callback) => { 
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)

                }

            })
        }

    }
}
