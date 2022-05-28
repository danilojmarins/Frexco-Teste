import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const CrudEstoque = ({usuario}) => {

    const createEstoqueSchema = object({

        usuario: string().min(1, 'UsuarioId é obrigatório.'),
        nome: string().min(1, 'Nome é obrigatória'),
        descricao: string().min(1, 'Descrição é obrigatória'),
        preco: number().min(1, 'Preço é obrigatório')
    
    });

    type CreateEstoqueInput = TypeOf<typeof createEstoqueSchema>;

    const [estoqueError, setEstoqueError] = useState(null);
    const [estoques, setEstoques] = useState([]);

    const { 
        register,
        formState:{errors},
        handleSubmit
    } = useForm<CreateEstoqueInput>({
        resolver: zodResolver(createEstoqueSchema)
    });

    async function onSubmit(values: CreateEstoqueInput) {
        try{
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/estoques`,
                values,
                { withCredentials: true }
            );
        } catch(e){
            setEstoqueError(e.message);
        }
    }

    async function getEstoques() {
        const data = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/estoques/`,
            {withCredentials:true}
        );

        console.log(data.data);

        setEstoques(data.data);
    }

    useEffect(() => {
        getEstoques();
    }, [])


    const hidden = 'hidden';

    return (
        <>

            <p>{estoqueError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form'>
                    <label htmlFor='nome'>Nome do Produto em Estoque</label>
                    <input id='nome' type='text' {...register('nome')} />
                    <p>{errors. nome?.message}</p>
                </div>

                <div className='form'>
                    <label htmlFor='descricao'>Descrição</label>
                    <input id='descricao' type='text' {...register('descricao')} />
                    <p>{errors.descricao?.message}</p>
                </div>

                <div className='form'>
                    <label htmlFor='preco'>Preço</label>
                    <input id='preco' type='number' {...register('preco', {valueAsNumber: true})} />
                    <p>{errors.preco?.message}</p>
                </div>

                <input id='usuario' type='text' value={usuario} style={{visibility: hidden}} {...register('usuario')} />

                <button type='submit'>Salvar Estoque</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {estoques.map(item => (
                        <tr key={item._id}>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                            <td>{item.preco}</td>
                            <td><button>Excluir</button><button>Editar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        </>
    );
};

export default CrudEstoque;