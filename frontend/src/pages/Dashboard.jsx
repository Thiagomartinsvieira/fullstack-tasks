import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import Nav from '../components/Nav';

const Dashboard = () => {
  const [userName, setUserName] = useState('');

 

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      console.log("token from Dashboard: ", token)
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token: ", decodedToken);
        setUserName(decodedToken.name || "Anonymous User");
      } else {
        console.log("No token found in localStorage");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  return (
    <>
      <Nav />
      <h1>Welcome: {userName}</h1>
    </>
  );
};

export default Dashboard;