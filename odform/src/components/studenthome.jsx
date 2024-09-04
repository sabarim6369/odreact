import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import Axios for making HTTP requests
import "../css/studenthome.css";

function Studenthome({ name, email, year, classs, section, id, od }) {
  const [internallimit, setInternalLimit] = useState(0);
  const [externallimit, setExternalLimit] = useState(0);
  const [internalTaken, setInternalTaken] = useState(0);
  const [externalTaken, setExternalTaken] = useState(0);
const[Name,setname]=useState(0);
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/student/odinfo/${email}`);
        const { internallimit, externallimit, internalTaken, externalTaken,name} = response.data;
       
    
        setInternalLimit(internallimit);
        setExternalLimit(externallimit);
        setInternalTaken(internalTaken);
        setExternalTaken(externalTaken);
        setname(name);
      } catch (error) {
        console.error("Error fetching data from backend:", error.message);
      }
    };

    fetchData();
  }, [email]);

  const internalBalance = internallimit - internalTaken;
  const externalBalance = externallimit - externalTaken;

  useEffect(() => {
    const odMessage = document.getElementById("od-message");
    if (odMessage) {
      setTimeout(() => {
        odMessage.style.display = "none";
      }, 5000);
    }
  }, [od]);

  return (
    <div className="student-home">
      <Link to="/changepassword" className="button change-password">Change Password</Link>

      <div className="od-info-boxes">
        <div className="od-box internal-od">
          <h2>Internal OD</h2>
          <p><strong>Limit:</strong> {internallimit}</p>
          <p><strong>Taken:</strong> <span id="internal-taken">{internalTaken}</span></p>
          <p><strong>Balance:</strong> <span id="internal-balance">{internalBalance}</span></p>
        </div>
        <div className="od-box external-od">
          <h2>External OD</h2>
          <p><strong>Limit:</strong> {externallimit}</p>
          <p><strong>Taken:</strong> <span id="external-taken">{externalTaken}</span></p>
          <p><strong>Balance:</strong> <span id="external-balance">{externalBalance}</span></p>
        </div>
      </div>

      <div className="container">
        <h1>Welcome, {Name}</h1>
        <p>{email}, you belong to the year {year} and class {classs}-{section}</p>
        <Link to={`/studentodinfo/${email}`} className="button">Get On-Duty Letter</Link>
        <Link to={`/previousodinfo/${id}`} className="button">View Previous ODs</Link>
        <Link to="/" className="button logout">Logout</Link>
        {od && <div id="od-message" className="od">{od}</div>}
      </div>
    </div>
  );
}

export default Studenthome;
