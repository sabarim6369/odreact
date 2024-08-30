import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/studenthome.css"


function Studenthome({ name, email, year, classs, section, internallimit, externallimit, internal, external, id, od }) {
  useEffect(() => {
    const internalTaken = parseInt(internal, 10);
    const externalTaken = parseInt(external, 10);
    const internalLimit = parseInt(internallimit, 10) || 0;
    const externalLimit = parseInt(externallimit, 10) || 0;

    const internalBalance = internalLimit - internalTaken;
    const externalBalance = externalLimit - externalTaken;

    document.getElementById("internal-balance").textContent = internalBalance;
    document.getElementById("external-balance").textContent = externalBalance;

    const odMessage = document.getElementById("od-message");
    if (odMessage) {
      setTimeout(() => {
        odMessage.style.display = "none";
      }, 5000);
    }
  }, [internal, external, internallimit, externallimit, od]);

  return (
    <div className="student-home">
      <Link to="/changepassword" className="button change-password">Change Password</Link>

      <div className="od-info-boxes">
        <div className="od-box internal-od">
          <h2>Internal OD</h2>
          <p><strong>Limit:</strong> {internallimit}</p>
          <p><strong>Taken:</strong> <span id="internal-taken">{internal}</span></p>
          <p><strong>Balance:</strong> <span id="internal-balance"></span></p>
        </div>
        <div className="od-box external-od">
          <h2>External OD</h2>
          <p><strong>Limit:</strong> {externallimit}</p>
          <p><strong>Taken:</strong> <span id="external-taken">{external}</span></p>
          <p><strong>Balance:</strong> <span id="external-balance"></span></p>
        </div>
      </div>

      <div className="container">
        <h1>Welcome, {name}</h1>
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
