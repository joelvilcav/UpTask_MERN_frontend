import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Alert from '../components/Alert';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, repeatPassword].includes('')) {
      setAlert({
        msg: 'Each field is mandatory',
        error: true,
      });
      return;
    }

    if (password !== repeatPassword) {
      setAlert({
        msg: 'Both password has to be the same',
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: 'Your password is too short, add at least 6 characters',
        error: true,
      });
      return;
    }

    // Register a user with the API
    try {
      const response = await axios.post('http://localhost:4000/api/users', {
        name,
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Create your account in and manage your{' '}
        <span className='text-slate-700'>projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className='mt-10 mb-6 bg-white shadow rounded-lg px-8 py-6'
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className='text-gray-600 block text-md font-bold'
            htmlFor='name'
          >
            Name
          </label>
          <input
            className='w-full mt-2 p-3 border rounded-xl bg-gray-50'
            type='text'
            placeholder='Your Name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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

        <div>
          <label
            className='text-gray-600 block text-md font-bold'
            htmlFor='password2'
          >
            Repeat your password
          </label>
          <input
            className='w-full mt-2 p-3 border rounded-xl bg-gray-50'
            type='password'
            placeholder='Repeat your password'
            id='password2'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <input
          type='submit'
          value='Sign up'
          className='bg-sky-700 w-full mt-3 py-2 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-2 text-slate-500 text-sm' to='/'>
          Do you have an account? Log in!
        </Link>
      </nav>
    </>
  );
};

export default Register;
