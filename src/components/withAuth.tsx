import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

// Define a type for the wrapped component's props
interface WithAuthProps {
  token: string;
}

// HOC function with a generic type for props
const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & WithAuthProps>) => {
  const AuthenticatedComponent = (props: P & WithAuthProps) => {
    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.getServerSideProps = async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P & WithAuthProps>> => {
    const { req } = context;
    const cookies = req.headers.cookie || '';

    // Parse cookies manually
    const parsedCookies = cookies
      ? Object.fromEntries(cookies.split('; ').map((c) => c.split('=')))
      : {};

    const token = parsedCookies.token;

    if (!token || token.trim() === '') {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    // Retrieve any additional props from the wrapped component's getServerSideProps (if defined)
    let wrappedProps: GetServerSidePropsResult<P> = { props: {} as P };

    if (WrappedComponent.getServerSideProps) {
      wrappedProps = (await WrappedComponent.getServerSideProps(context)) as GetServerSidePropsResult<P>;
    }

    return {
      ...wrappedProps,
      props: {
        ...wrappedProps.props,
        token,
      },
    };
  };

  return AuthenticatedComponent;
};

export default withAuth;
