import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

const FormCollaborator = () => {
  const [email, setEmail] = useState('');
  const { showAlert, alert, submitCollaborator } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      showAlert({
        msg: 'Email is required',
        error: true,
      });
      return;
    }

    submitCollaborator(email);
  };

  const { msg } = alert;

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
    >
      {msg && <Alert alert={alert} />}

      <label
        className='text-gray-700 font-bold text-md uppercase'
        htmlFor='name'
      >
        Collaborator email
      </label>

      <input
        type='text'
        id='email'
        placeholder='Email'
        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='submit'
        className='mt-5 bg-sky-600 hover:bg-sky-700 w-full p-3 text-white font-bold cursor-pointer transition-colors rounded uppercase text-sm'
        value='Look collaborator'
      />
    </form>
  );
};

export default FormCollaborator;
