import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import "../css/studenthome.css";

function Studenthome() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    year: '',
    classs: '',
    section: '',
    internallimit: 0,
    externallimit: 0,
    internalDays: 0,
    externalDays: 0,
    id: '',
    rollno:''
  });
  
  const [od, setOd] = useState('');

  useEffect(() => {
    const storedData = sessionStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData)); 
    } else if (location.state) {
      
      sessionStorage.setItem('userData', JSON.stringify(location.state));
      setUserData(location.state);
    } else {
    
      navigate('/');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/student/odinfo/${userData.email}`);
        setOd(response.data.od || '');
      } catch (error) {
        console.error("Error fetching data from backend:", error.message);
      }
    };

    if (userData.email) {
      fetchData();
    }
  }, [userData.email]);

  const internalBalance = userData.internallimit - userData.internalDays;
  const externalBalance = userData.externallimit - userData.externalDays;

  useEffect(() => {
    const odMessage = document.getElementById("od-message");
    if (odMessage) {
      setTimeout(() => {
        odMessage.style.display = "none";
      }, 5000);
    }
  }, [od]);

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div className="student-home">
      <Link to="/changepassword" className="button change-password">Change Password</Link>

      <div className="od-info-boxes">
        <div className="od-box internal-od">
          <h2>Internal OD</h2>
          <p><strong>Limit:</strong> {userData.internallimit}</p>
          <p><strong>Taken:</strong> <span id="internal-taken">{userData.internalDays}</span></p>
          <p><strong>Balance:</strong> <span id="internal-balance">{internalBalance}</span></p>
        </div>
        <div className="od-box external-od">
          <h2>External OD</h2>
          <p><strong>Limit:</strong> {userData.externallimit}</p>
          <p><strong>Taken:</strong> <span id="external-taken">{userData.externalDays}</span></p>
          <p><strong>Balance:</strong> <span id="external-balance">{externalBalance}</span></p>
        </div>
      </div>

      <div className="container">
        <h1>Welcome, {userData.name}</h1>
        <p>{userData.email}, you belong to the year {userData.year} and class {userData.classs}-{userData.section}</p>
        <Link to={`/studentodinfo/${userData.email}`} className="button">Get On-Duty Letter</Link>
        <Link to={`/previousodinfo/${userData.id}`} className="button">View Previous ODs</Link>
        <button onClick={handleLogout} className="button logout">Logout</button>
        {od && <div id="od-message" className="od">{od}</div>}
      </div>
    </div>
  );
}

export default Studenthome;
