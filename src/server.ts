import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
// Dai falta adicionar a tipagem do Cors
// [X] npm i --save-dev @types/cors ou yarn add @types/cors -D
import cors from 'cors';

import {router} from './routes'
    
const app =express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
if(err instanceof Error){
    //se for uma instância do tipo error
    return response.status(400).json({
        error: err.message
    })
}
    return response.status(500).json({
        status:'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () =>console.log('Servidor Online!'))