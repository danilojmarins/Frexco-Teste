import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { object, string, TypeOf, ZodString } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const createUsuarioSchema = object({
    
    email: string().min(1, 'Email é obrigatório').email('Email não válido'),
    nome: string().min(1, 'Nome é obrigatório'),
    senha: string().min(1, 'Senha é obrigatório').min(6, 'Senha muito curta: Senha deve ter 6 caracteres no mínimo'),
    senhaConfirmacao: string().min(1, 'Confirmação da senha é obrigatório')
    
}).refine((data) => data.senha === data.senhaConfirmacao, {
    message: 'As senhas não são iguais',
    path: ['senhaConfirmacao']
});


type CreateUsuarioInput = TypeOf<typeof createUsuarioSchema>;


function RegisterPage() {

    const router = useRouter();

    const [registerError, setRegisterError] = useState(null);

    const { 
        register,
        formState:{errors},
        handleSubmit
    } = useForm<CreateUsuarioInput>({
        resolver: zodResolver(createUsuarioSchema)
    });

    async function onSubmit(values: CreateUsuarioInput) {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/usuarios`, values);
            router.push('/');
        } catch(e){
            setRegisterError(e.message);
        }
    }

    console.log({errors});

    return ( 
        <>
            <p>{registerError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' placeholder='nome@exemplo.com' {...register('email')} />
                    <p>{errors.email?.message}</p>
                </div>

                <div className='form'>
                    <label htmlFor='nome'>Nome</label>
                    <input id='nome' type='text' placeholder='Nome Sobrenome' {...register('nome')} />
                    <p>{errors.nome?.message}</p>
                </div>

                <div className='form'>
                    <label htmlFor='senha'>Senha</label>
                    <input id='senha' type='password' placeholder='**********' {...register('senha')} />
                    <p>{errors.senha?.message}</p>
                </div>

                <div className='form'>
                    <label htmlFor='senhaConfirmacao'>Confirmar Senha</label>
                    <input id='senhaConfirmacao' type='password' placeholder='**********' {...register('senhaConfirmacao')} />
                    <p>{errors.senhaConfirmacao?.message}</p>
                </div>
                <button type='submit'>REGISTER</button>
            </form>
        </>
    );
}

export default RegisterPage;