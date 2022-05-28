import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const createSessionSchema = object({

    email: string().min(1, 'Email é obrigatório.'),
    senha: string().min(1, 'Senha é obrigatória')

});


type CreateSessionInput = TypeOf<typeof createSessionSchema>;


function LoginPage() {

    const router = useRouter();

    const [loginError, setLoginError] = useState(null);

    const { 
        register,
        formState:{errors},
        handleSubmit
    } = useForm<CreateSessionInput>({
        resolver: zodResolver(createSessionSchema)
    });

    async function onSubmit(values: CreateSessionInput) {
        try{
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                values,
                { withCredentials: true }
            );
            
            router.push('/');
        } catch(e){
            setLoginError(e.message);
        }
    }

    console.log({errors});

    return ( 
        <>
            <p>{loginError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' placeholder='nome@exemplo.com' {...register('email')} />
                    <p>{errors.email?.message}</p>
                </div>

                <div className='form'>
                    <label htmlFor='senha'>Senha</label>
                    <input id='senha' type='password' placeholder='**********' {...register('senha')} />
                    <p>{errors.senha?.message}</p>
                </div>

                <button type='submit'>LOGIN</button>
            </form>
        </>
    );
}

export default LoginPage;