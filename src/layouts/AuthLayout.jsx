import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className='container mx-auto p-5 py-10 md:flex md:justify-center'>
        <div className='md:w-2/3 lg:w-1/3'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
