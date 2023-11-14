import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();
  if (loading) return 'Loading...';
  return (
    <>
      {auth._id ? (
        <div className='bg-gray-100'>
          <Header />
          <div className='md:flex md:min-h-screen'>
            <Sidebar />
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};

export default ProtectedRoute;
