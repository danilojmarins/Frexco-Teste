import express from 'express';
import config from 'config';

const port = config.get<number>('port');

const app = express();

app.listen(port, () => {
    console.log('Listening to port 3000.');
});

app.get('/', (req, res) => {
    req.body('hello world');

});

const add = (a: number, b: number) => {
    return a + b;
}
