import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
// Dai falta adicionar a tipagem do Cors
// [X] npm i --save-dev @types/cors ou yarn add @types/cors -D
//Xarlys, a dependencia foi instalada, está no ambiente de desenvolvimento "@types/cors": "^2.8.13"
import cors from 'cors';
import path from "path";
import {router} from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'

//utilizado para a integração com o Swagger
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require ('./swagger.json')

const app =express();
app.use(express.json());
app.use(cors());
//utilizado para a integração com o Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(router);
// para acessar na web -> http://localhost:3333/files/2ca938ce67c0b87c2b29acb7f5fee8f0-queijo.png
app.use('/files', express.static(path.resolve(__dirname,'..', 'tmp')))

//mensagem para erro
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
if(err instanceof Error){
    return response.status(400).json({
        error: err.message
    })
}
    return response.status(500).json({
        status:'error',
        message: 'Internal server error.'
    })
})
//se tudo estiver ok com o backend 
app.listen(3333, () =>console.log('Servidor Online!'))