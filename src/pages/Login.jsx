import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Alert from '../components/Alert';
import axiosClient from '../config/axiosClient';

import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post('/users/login', {
        email,
        password,
      });
      setAlert({});
      localStorage.setItem('token', data.tokenJwt);
      setAuth(data);
      navigate('projects');
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Get in and manage your <span className='text-slate-700'>projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className='mt-10 mb-6 bg-white shadow rounded-lg px-8 py-6'
        onSubmit={handleSubmit}
      >
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      <p className='block text-center my-2 text-slate-500 text-sm'>
        Currently this app is not sending emails, but you can test now with
        users pre-registered:
        <span className='font-semibold'>{' '}email@email.com</span> and{' '}
        <span className='font-semibold'>correo@correo.com</span>, both accounts
        has the password: <span className='font-semibold'>password</span>
      </p>
    </>
  );
};

export default Login;
