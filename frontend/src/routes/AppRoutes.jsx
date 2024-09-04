import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';
import CreateTask from '../pages/CreateTask';
import EditTask from '../pages/EditTask';

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
        <Route path='tasks/new' element={<CreateTask token={token} />} /> 
        <Route path='/tasks/edit/:id' element={<EditTask token={token} />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
