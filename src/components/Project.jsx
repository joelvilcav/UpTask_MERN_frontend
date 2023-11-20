import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdmin';
import ModalFormTask from './ModalFormTask';
import ModalDeleteTask from './ModalDeleteTask';
import ModalDeleteCollaborator from './ModalDeleteCollaborator';
import Task from './Task';
import Collaborator from './Collaborator';

const Project = () => {
  const params = useParams();
  const admin = useAdmin();

  const { project, getProject, loading, handleModalTask } =
    useProjects();

  useEffect(() => {
    getProject(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { name } = project;
  console.log(admin);

  if (loading) return 'Loading...';

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='font-black text-4xl'>{name}</h1>
        {admin && (
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
        )}
      </div>

      {admin && (
        <button
          onClick={handleModalTask}
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
      )}

      <p className='font-bold text-xl mt-10'>Project&apos;s task</p>

      {/* <div className='flex justify-center'>
        <div className='w-full md:w-1/3 lg:w-1/4'>
          {msg && <Alert alert={alert} />}
        </div>
      </div> */}

      <div className='bg-white shadow mt-10 rounded-lg'>
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className='text-center my-5 p-10'>There are no tasks yet</p>
        )}
      </div>

      {admin && (
        <>
          <div className='flex items-center justify-between mt-10'>
            <p className='font-bold text-xl'>Collaborators</p>
            <Link
              to={`/projects/add-collaborator/${project._id}`}
              className='text-gray-400 uppercase font-bold hover:text-black'
            >
              Add
            </Link>
          </div>

          <div className='bg-white shadow mt-10 rounded-lg'>
            {project.collaborators?.length ? (
              project.collaborators?.map((collaborator) => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                />
              ))
            ) : (
              <p className='text-center my-5 p-10'>
                There are no collaborators yet
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormTask />
      <ModalDeleteTask />
      <ModalDeleteCollaborator />
    </>
  );
};

export default Project;
