import Layout from '../components/Layout';
import nookies, { parseCookies } from 'nookies';


const Home = () => {
  return (
    <Layout>
      <div className='pl-[17%]'>
        <h1 className="text-3xl font-bold mb-4">Welcome to the Admin</h1>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  console.log(context);
  const cookies = parseCookies(context);
  
  console.log('All cookies:', cookies);

  const token = cookies.token;

  if (!token || token.trim() === '') {
    console.log("Redirecting to login due to missing or empty token...");
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, 
  };
};