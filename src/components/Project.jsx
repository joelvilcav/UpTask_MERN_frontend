import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useProjects from '../hooks/useProjects';

const Project = () => {
  const params = useParams();
  const { project, getProject, loading } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  return loading ? (
    'Loading'
  ) : (
    <div>
      <h1 className='font-black text-4xl'>{name}</h1>
    </div>
  );
};

export default Project;
