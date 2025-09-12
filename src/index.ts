import { server } from './server/Server'; // importando o server

server.listen(process.env.PORT || 3333, () => {
    console.log(`Running in PORT ${process.env.PORT || 3333}`);
}); // Porta da api node