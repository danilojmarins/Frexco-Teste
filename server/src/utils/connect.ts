import mongoose from 'mongoose';
import config from 'config';

async function connect() {
    const dbUri = config.get<string>('dbUri');

    try {
        await mongoose.connect(dbUri);
        console.log('Conectado ao BD.');
    } catch (error) {
        console.error('Não foi possível conectar ao BD.');
        process.exit(1);
    }
}

export default connect;