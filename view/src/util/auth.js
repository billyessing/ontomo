export const authMiddleWare = (history) => {
  const authToken = sessionStorage.getItem('AuthToken');
  if (authToken === null) {
    history.push('/login');
  }
};
