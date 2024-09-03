import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login /> } />
        <Route path='/dashboard' element={<Dashboard /> } />
        <Route path='my-tasks' element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
