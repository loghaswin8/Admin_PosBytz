import Layout from '../components/Layout';
import nookies, { parseCookies } from 'nookies';
import withAuth from '../components/withAuth'
import { authenticateUser, validateToken } from '../auth/authHelper';

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
  const { req } = context;

  const { valid, token, redirect } = validateToken(req);

  if (!valid) {
    console.log("Redirecting to login due to empty token...");
    return {
      redirect,
    };
  }

  return {
    props: {
      token,
    },
  };
};