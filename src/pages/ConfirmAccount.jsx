import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import axiosClient from '../config/axiosClient';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await axiosClient(url);
        setAlert({
          msg: data.msg,
          error: false,
        });

        setConfirmedAccount(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Confirm your <span className='text-slate-700'>account</span>
      </h1>

      <div className='mt-20 md:mt-3 shadow-lg px-4 py-7 rounded-xl bg-white'>
        {msg && <Alert alert={alert} />}
        {confirmedAccount && (
          <Link
            className='block text-center my-2 text-slate-500 text-sm'
            to='/'
          >
            Log in!
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
