import { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
    }
  }, []);

  const firstName = userName.split(' ')[0];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserName('');
    navigate('/');
  };

  return (
    <div>
      <nav
        className="block w-full max-w-screen-xl px-6 py-3 mx-auto text-white border shadow-md rounded-xl 
        border-white/80 bg-opacity-80 bg-black backdrop-blur-2xl backdrop-saturate-200"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <a
            href="#"
            className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased"
          >
            TaskMaster
          </a>
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                <Link to="/">Home</Link>
              </li>
              {userName && (
                <>
                   <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    <Link to="/my-tasks">My Tasks</Link>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
              {!userName && (
                <>
                  <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    <Link to="/register">Register</Link>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
