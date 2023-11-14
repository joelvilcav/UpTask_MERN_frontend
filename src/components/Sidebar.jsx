import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10'>
      <p className='text-xl font-bold'>Hi there: Joel</p>
      <Link
        to='create-project'
        className='bg-sky-600 p-3 text-white font-bold block mt-5 text-center rounded-lg'
      >
        New Project
      </Link>
    </aside>
  );
};

export default Sidebar;
