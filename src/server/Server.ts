// Importando tudo do express. É o framework principal para criar o servidor.
import express from 'express';

// Carrega as variáveis de ambiente do arquivo .env para process.env
import 'dotenv/config';

// Importa o gerenciador de rotas de outro arquivo. Boa prática para organização!
import { router } from './routes';

// Cria uma instância (uma cópia funcional) do Express.
// A variável 'server' será o nosso servidor web.
const server = express();

// Adiciona um "middleware". Este, especificamente, ensina o servidor a
// entender e processar requisições cujo corpo (body) está no formato JSON.
// Essencial para APIs modernas.
server.use(express.json());

// Diz ao servidor para usar as rotas que foram importadas do arquivo './routes/index'.
// Qualquer requisição que chegar (ex: /users, /products) será gerenciada por esse 'router'.
server.use(router);

// Exporta a instância configurada do servidor.
// Isso permite que outro arquivo (geralmente o index.ts principal)
// importe este servidor já pronto e apenas o coloque para "rodar" (com server.listen()).
export { server };