import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import useProjects from '../hooks/useProjects';
import ModalFormTask from './ModalFormTask';

const Project = () => {
  const params = useParams();
  const { project, getProject, loading } = useProjects();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  return loading ? (
    'Loading'
  ) : (
    <>
      <div className='flex justify-between'>
        <h1 className='font-black text-4xl'>{name}</h1>
        <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
            />
          </svg>
          <Link
            to={`/projects/edit/${params.id}`}
            className='uppercase font-bold'
          >
            Edit
          </Link>
        </div>
      </div>
      <button
        onClick={() => setModal(true)}
        type='button'
        className='text-sm px-5 py-3 w-full md:w-auto rounded-lg font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6'
        >
          <path
            fillRule='evenodd'
            d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
            clipRule='evenodd'
          />
        </svg>
        Add task
      </button>
      <ModalFormTask modal={modal} setModal={setModal} />
    </>
  );
};

export default Project;
