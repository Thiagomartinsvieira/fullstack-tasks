import { useEffect, useState } from "react";
import { GrMenu } from "react-icons/gr";
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/AuthService";

const Nav = () => {
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUserName('');
    navigate('/');
    // window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white shadow-md rounded-xl p-4 w-full max-w-screen-xl mx-auto relative">
      <div className="flex items-center justify-between">
        <a href="#" className="text-xl font-semibold">
          TaskMaster
        </a>
        <div className="flex lg:hidden">
          <button onClick={toggleMenu} className="text-white" aria-label="Toggle menu">
            <GrMenu />
          </button>
        </div>
        <div className={`hidden lg:flex flex-grow justify-center`}>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            {userName && (
              <>
                <li>
                  <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                </li>
                <li>
                  <Link to="/my-tasks" className="hover:underline">My Tasks</Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:underline">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">Logout</button>
                </li>
              </>
            )}
            {!userName && (
              <>
                <li>
                  <Link to="/register" className="hover:underline">Register</Link>
                </li>
                <li>
                  <Link to="/login" className="hover:underline">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-black text-white ${isMenuOpen ? 'block' : 'hidden'} z-50 overflow-auto`}>
        <div className="flex flex-col h-full p-4">
          <button onClick={toggleMenu} className="text-white mb-4 self-end text-2xl" aria-label="Close menu">
            &times;
          </button>
          <ul className="flex flex-col flex-grow justify-center items-center space-y-4">
            <li>
              <Link to="/" className="text-xl hover:underline" onClick={toggleMenu}>Home</Link>
            </li>
            {userName && (
              <>
                <li>
                  <Link to="/dashboard" className="text-xl hover:underline" onClick={toggleMenu}>Dashboard</Link>
                </li>
                <li>
                  <Link to="/my-tasks" className="text-xl hover:underline" onClick={toggleMenu}>My Tasks</Link>
                </li>
                <li>
                  <Link to="/profile" className="text-xl hover:underline" onClick={toggleMenu}>Profile</Link>
                </li>
                <li>
                  <button onClick={() => { handleLogout(); toggleMenu(); }} className="text-xl hover:underline">Logout</button>
                </li>
              </>
            )}
            {!userName && (
              <>
                <li>
                  <Link to="/register" className="text-xl hover:underline" onClick={toggleMenu}>Register</Link>
                </li>
                <li>
                  <Link to="/login" className="text-xl hover:underline" onClick={toggleMenu}>Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
