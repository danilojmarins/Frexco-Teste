import { object, string, TypeOf } from 'zod';

export const createUsuarioSchema = object({
    body: object({
        email: string({
            required_error: 'Email é obrigatório'
        }).email('Email não válido'),
        nome: string({
            required_error: 'Nome é obrigatório'
        }),
        senha: string({
            required_error: 'Senha é obrigatório'
        }),
        senhaConfirmacao: string({
            required_error: 'Confirmação da senha é obrigatório'
        })
    }).refine((data) => data.senha === data.senhaConfirmacao, {
        message: 'As senhas não são iguais',
        path: ['senhaConfirmacao']
    })
});


export type CreateUsuarioInput = TypeOf<typeof createUsuarioSchema>;