import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Get in and manage your <span className='text-slate-700'>projects</span>
      </h1>

      <form className='mt-10 mb-6 bg-white shadow rounded-lg px-8 py-6'>
        <div>
          <label
            className='text-gray-600 block text-md font-bold'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='w-full mt-2 p-3 border rounded-xl bg-gray-50'
            type='email'
            placeholder='email@email.com'
            id='email'
          />
        </div>

        <div>
          <label
            className='text-gray-600 block text-md font-bold'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='w-full mt-2 p-3 border rounded-xl bg-gray-50'
            type='password'
            placeholder='Your password'
            id='password'
          />
        </div>

        <input
          type='submit'
          value='Log In'
          className='bg-sky-700 w-full mt-3 py-2 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-2 text-slate-500 text-sm'
          to='register'
        >
          Sign up here!
        </Link>

        <Link
          className='block text-center my-2 text-slate-500 text-sm'
          to='forgot-password'
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
};

export default Login;
