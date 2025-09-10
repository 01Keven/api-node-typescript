// Esse arquivo vai ter o codigo base do Servidor

import express from 'express'; // Importando tudo do express

// Instancia do express
const server = express();

// Rotas e Endpoints
// Solicita requisição e entrega uma resposta ao server
server.get('/', (_, res) => { 
    return res.send('Response accept!'); // Enviando resposta ao Client
});


export { server }; // Exportando servidor para ser usado no index.ts