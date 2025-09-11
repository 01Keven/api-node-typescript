// Esse arquivo vai ter o codigo base do Servidor
import express from 'express'; // Importando tudo do express
import { router } from './routes/index';

// Instancia do express
const server = express();

// Usando json no postman para habilitar request
server.use(express.json());

// Usando rotas do escopo
server.use(router);

export { server }; // Exportando servidor para ser usado no index.ts