import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Alert from '../components/Alert';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [passwordModified, setPasswordModified] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/users/forgot-password/${token}`
        );
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    verifyToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlert({
        msg: 'The length of the password has to be at least 6 characters',
        error: true,
      });
      return;
    }

    try {
      const url = `http://localhost:4000/api/users/forgot-password/${token}`;
      const { data } = await axios.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPasswordModified(true);
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
        Reset your and get access to your{' '}
        <span className='text-slate-700'>account</span>
      </h1>

      {msg && <Alert alert={alert} />}

      {validToken && (
        <form
          className='mt-10 mb-6 bg-white shadow rounded-lg px-8 py-6'
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className='text-gray-600 block text-md font-bold'
              htmlFor='password'
            >
              New password
            </label>
            <input
              className='w-full mt-2 p-3 border rounded-xl bg-gray-50'
              type='password'
              placeholder='Write your new password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type='submit'
            value='Save New Password'
            className='bg-sky-700 w-full mt-3 py-2 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
          />
        </form>
      )}

      {passwordModified && (
        <Link className='block text-center my-2 text-slate-500 text-sm' to='/'>
          Log in!
        </Link>
      )}
    </>
  );
};

export default NewPassword;
