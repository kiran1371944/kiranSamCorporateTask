import { Navigate, Outlet } from 'react-router-dom';

function protectiveRoute() {
    const authToken = localStorage.getItem('authToken');
  return authToken ? <Outlet /> : <Navigate to="/login" />;
}

export default protectiveRoute