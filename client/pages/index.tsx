import type { GetServerSideProps, NextPage } from 'next'
import useSwr from 'swr';
import styles from '../styles/Home.module.css'
import fetcher from '../utils/fetcher';
import CrudProduto from '../components/CrudProduto';

interface Usuario {
  _id: string;
  email: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

const Home: NextPage<{fallbackData: Usuario}> = ({fallbackData}) => {

  const { data } = useSwr<Usuario | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  )

  if(data){
    return (
      <>
        <CrudProduto usuario={data._id} />
      </>
    );
  }

  return (
    <div className={styles.container}>
      Please Login
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    context.req.headers
  );

  return { props: {fallbackData: data} }

}

export default Home;