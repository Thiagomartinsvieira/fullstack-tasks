import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token: ", decodedToken); 
      setUserName(decodedToken.name);  
    }
  }, []);

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
    </div>
  );
};

export default Dashboard;
