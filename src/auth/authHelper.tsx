// authHelper.tsx
export const validateToken = (req) => {
    const cookies = req.headers.cookie;
    
    const parsedCookies = cookies
      ? Object.fromEntries(cookies.split('; ').map(c => c.split('=')))
      : {};
    
    const token = parsedCookies.token;
    
    if (!token || token.trim() === '') {
      return {
        valid: false,
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    return {
      valid: true,
      token,
    };
  };
  