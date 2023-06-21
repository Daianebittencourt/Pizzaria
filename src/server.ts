import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
// Dai falta adicionar a tipagem do Cors
// [X] npm i --save-dev @types/cors ou yarn add @types/cors -D
//Xarlys, a dependencia foi instalada, está no ambiente de desenvolvimento "@types/cors": "^2.8.13"
import cors from 'cors';

import {router} from './routes'
    
const app =express();
app.use(express.json());
app.use(cors());

app.use(router);

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