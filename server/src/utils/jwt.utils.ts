import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJwt(
    object: Object, 
    options?: jwt.SignOptions | undefined
    ) {
        return jwt.sign(object, privateKey, {
            ...(options && options),
            algorithm: 'RS256'
        });
};


export function verifyJwt(token: string) {
    try{
        const decode = jwt.verify(token, publicKey);
        return {
            valido: true,
            expired: false,
            decode,
        };
    } catch(e: any){
        return {
            valido: false,
            expired: e.message === 'jwt expirado',
            decode: null
        };
    };
}