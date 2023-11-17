import { formatDate } from '../helpers/formatDate';
import useProjects from '../hooks/useProjects';

const Task = ({ task }) => {
  const { name, description, deadline, priority, status, _id } = task;
  const { handleModalEditTask } = useProjects();

  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div>
        <p className='mb-1 text-lg'>{name}</p>
        <p className='mb-1 text-sm text-gray-500'>{description}</p>
        <p className='mb-1 text-md'>{formatDate(deadline)}</p>
        <p className='mb-1 text-gray-600'>Priority: {priority}</p>
      </div>
      <div className='flex gap-2'>
        <button
          className='bg-indigo-600 px-4 py-3 text-white text-sm rounded-lg'
          onClick={() => handleModalEditTask(task)}
        >
          Edit
        </button>

        {status ? (
          <button className='bg-sky-600 px-4 py-3 text-white text-sm rounded-lg'>
            Complete
          </button>
        ) : (
          <button className='bg-gray-600 px-4 py-3 text-white text-sm rounded-lg'>
            Incomplete
          </button>
        )}

        <button className='bg-red-600 px-4 py-3 text-white text-sm rounded-lg'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
