import { object, string } from 'zod';

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email é obrigatório.'
        }),
        senha: string({
            required_error: 'Senha é obrigatória'
        })
    })
});