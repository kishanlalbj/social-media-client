import jwtDecode from 'jwt-decode';

const verifyJwt = (token) => {
  if (!token) return false;

  const { exp } = jwtDecode(token);
  if (exp * 1000 < Date.now()) return false;

  return true;
};

export default verifyJwt;
