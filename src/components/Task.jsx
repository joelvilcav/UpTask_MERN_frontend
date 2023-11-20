import { formatDate } from '../helpers/formatDate';
import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdmin';

const Task = ({ task }) => {
  const admin = useAdmin();
  const { name, description, deadline, priority, status, _id } = task;
  const { handleModalEditTask, handleModalDeleteTask, completeTask } =
    useProjects();

  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div className='flex flex-col items-start'>
        <p className='mb-1 text-lg'>{name}</p>
        <p className='mb-1 text-sm text-gray-500'>{description}</p>
        <p className='mb-1 text-md'>{formatDate(deadline)}</p>
        <p className='mb-1 text-gray-600'>Priority: {priority}</p>
        {status && (
          <p className='text-xs bg-green-600 uppercase p-2 rounded-lg text-white'>
            Finished by: {task.finishedBy.name}
          </p>
        )}
      </div>
      <div className='flex flex-col lg:flex-row gap-2'>
        {admin && (
          <button
            className='bg-indigo-600 px-4 py-3 text-white text-sm rounded-lg'
            onClick={() => handleModalEditTask(task)}
          >
            Edit
          </button>
        )}

        <button
          className={`${
            status ? 'bg-sky-600' : 'bg-gray-600'
          } px-4 py-3 text-white text-sm rounded-lg`}
          onClick={() => completeTask(_id)}
        >
          {status ? 'Complete' : 'Incomplete'}
        </button>

        {admin && (
          <button
            onClick={() => handleModalDeleteTask(task)}
            className='bg-red-600 px-4 py-3 text-white text-sm rounded-lg'
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
