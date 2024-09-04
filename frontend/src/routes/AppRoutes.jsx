import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';
import CreateTask from '../pages/CreateTask';

const AppRoutes = () => {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login /> } />
        <Route path='/dashboard' element={<Dashboard /> } />
        <Route path='my-tasks' element={<Tasks />} />
        <Route path='create-task' element={<CreateTask token={token} />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
