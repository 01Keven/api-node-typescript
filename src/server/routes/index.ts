// Router -> define escopo de rotas que o servidor vai usar
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

// Solicita requisição e entrega uma resposta ao server
// Aceita requisições pelas rotas
router.get('/', (_, res) => {
    return res.send('Response accept!'); 
});

router.post('/teste', (req, res) => {
    console.log(req.body);
    // return res.send('post!');
    return res.status(StatusCodes.OK).json(req.body); // indicar que é um json
});

export { router };