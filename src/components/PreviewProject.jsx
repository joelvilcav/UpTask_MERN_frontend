import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PreviewProject = ({ project }) => {
  const { auth } = useAuth();
  const { name, _id, client, owner } = project;

  return (
    <div className='border-b p-5 flex flex-col md:flex-row justify-between'>
      <div className='flex gap-2 items-center'>
        <p className='flex-1 font-semibold'>
          {name}
          <span className='text-sm text-gray-500 uppercase'> {client}</span>
        </p>

        {auth._id !== owner && (
          <p className='p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase'>
            Collaborator
          </p>
        )}
      </div>

      <Link
        to={`${_id}`}
        className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
      >
        More Info
      </Link>
    </div>
  );
};

export default PreviewProject;
