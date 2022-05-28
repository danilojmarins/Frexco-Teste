import express from 'express';
import cors from 'cors';
import config from 'config';
import cookieParser from 'cookie-parser';
import connect from './utils/connect';
import routes from './routes';
import deserializeUsuario from './middleware/deserializeUsuario';


const port = config.get<number>('port');

const app = express();

app.use(
    cors({
        origin: config.get('origin'),
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());

app.use(deserializeUsuario);

app.listen(port, async () => {
    console.log(`Servidor aberto na porta: ${port}.`);

    await connect();

    routes(app);
});