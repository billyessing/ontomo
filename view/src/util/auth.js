export const authMiddleWare = (navigate) => {
  const authToken = sessionStorage.getItem('AuthToken');
  if (authToken === null) {
    navigate('/login');
  }
};
