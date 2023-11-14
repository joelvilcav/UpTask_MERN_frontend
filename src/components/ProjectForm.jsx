import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [client, setClient] = useState('');

  const { alert, showAlert, submitProject } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, description, deadline, client].includes('')) {
      showAlert({
        msg: 'All fields are required',
        error: true,
      });

      return;
    }

    // Passing data to the project context
    submitProject({ name, description, deadline, client });
  };

  const { msg } = alert;

  return (
    <form
      className='bg-white py-10 px-5 md:w-2/3 rounded-lg shadow-lg'
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className='mb-5'>
        <label className='text-gray-700 font-bold text-sm' htmlFor='name'>
          Project
        </label>
        <input
          id='name'
          type='text'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400'
          placeholder="Project's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-700 font-bold text-sm'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          id='description'
          type='text'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400'
          placeholder="Project's description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label className='text-gray-700 font-bold text-sm' htmlFor='deadline'>
          Deadline
        </label>
        <input
          id='deadline'
          type='date'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label className='text-gray-700 font-bold text-sm' htmlFor='client'>
          Client
        </label>
        <input
          id='client'
          type='text'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400'
          placeholder="Client's name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>
      <input
        type='submit'
        value='Create Project'
        className='bg-sky-600 w-1/3 p-2 block mx-auto font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
      />
    </form>
  );
};

export default ProjectForm;
