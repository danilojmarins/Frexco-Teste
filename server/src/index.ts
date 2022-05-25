import express from 'express';
import config from 'config';
import connect from './utils/connect';
import routes from './routes';
import deserializeUsuario from './middleware/deserializeUsuario';


const port = config.get<number>('port');

const app = express();

app.use(express.json());

app.use(deserializeUsuario);

app.listen(port, async () => {
    console.log(`Servidor aberto na porta: ${port}.`);

    await connect();

    routes(app);
});