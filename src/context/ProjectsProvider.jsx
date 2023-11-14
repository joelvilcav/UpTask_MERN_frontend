import { createContext, useState, useEffect } from 'react';

import axiosClient from '../config/axiosClient';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState([]);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 2500);
  };

  const submitProject = async (project) => {
    console.log(project);
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, alert, showAlert, submitProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
