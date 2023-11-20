import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosClient from '../config/axiosClient';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [task, setTask] = useState({});
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [collaborator, setCollaborator] = useState({});
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient('/projects', config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 2500);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/projects/${project.id}`,
        project,
        config
      );
      console.log(data);

      // Synchronize state
      const projectsUpdated = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );
      setProjects(projectsUpdated);

      setAlert({
        msg: 'Project updated propertly',
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2500);

      // Redirect
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post('/projects', project, config);
      setProjects([...projects, data]);

      setAlert({
        msg: 'Project created propertly',
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient(`/projects/${id}`, config);
      setProject(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(`/projects/${id}`, config);

      // Synchronize state
      const projectsUpdated = projects.filter(
        (projectState) => projectState._id !== id
      );

      setProjects(projectsUpdated);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTask = () => {
    setModalFormTask(!modalFormTask);
    setTask({});
  };

  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post('/tasks', task, config);

      // Add task to state
      const projectUpdated = { ...project };
      projectUpdated.tasks = [...project.tasks, data];
      setProject(projectUpdated);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);
      console.log(data);

      const projectUpdated = { ...project };
      projectUpdated.tasks = projectUpdated.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );
      setProject(projectUpdated);

      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditTask = (task) => {
    setTask(task);
    setModalFormTask(true);
  };

  const handleModalDeleteTask = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(`/tasks/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false,
      });
      console.log(data);

      const projectUpdated = { ...project };
      projectUpdated.tasks = projectUpdated.tasks.filter(
        (taskState) => taskState._id !== task._id
      );

      setProject(projectUpdated);

      setModalDeleteTask(false);
      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const submitCollaborator = async (email) => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/collaborators/`,
        { email },
        config
      );

      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }

    setLoading(false);
  };

  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      setCollaborator({});
      setTimeout(() => {
        setAlert({});
      }, 2500);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleModalDeleteCollaborator = (collaborator) => {
    setModalDeleteCollaborator(!modalDeleteCollaborator);
    setCollaborator(collaborator);
  };

  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );

      const projectUpdated = { ...project };
      projectUpdated.collaborators = projectUpdated.collaborators.filter(
        (collaboratorState) => collaboratorState._id !== collaborator._id
      );

      setProject(projectUpdated);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setCollaborator({});
      setModalDeleteCollaborator(false);
      setTimeout(() => {
        setAlert({});
      }, 2500);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        alert,
        showAlert,
        submitProject,
        project,
        getProject,
        loading,
        deleteProject,
        modalFormTask,
        handleModalTask,
        submitTask,
        handleModalEditTask,
        task,
        modalDeleteTask,
        handleModalDeleteTask,
        deleteTask,
        submitCollaborator,
        collaborator,
        setCollaborator,
        addCollaborator,
        handleModalDeleteCollaborator,
        modalDeleteCollaborator,
        deleteCollaborator,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
