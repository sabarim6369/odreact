import React, { useState } from 'react';
import '../css/previousod.css'; // Import your CSS file for styles

function Previousod() {
  // State to manage which section is displayed
  const [activeSection, setActiveSection] = useState('');

  // Function to handle section changes
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="container">
      <a href="/studenthome2" className="button back-to-home">Back to Home</a>
      <h1>Previous OD Information</h1>

      <div className="button-group">
        <button onClick={() => handleSectionChange('in-progress-advisor')} className="button">In-Progress (Advisor)</button>
        <button onClick={() => handleSectionChange('in-progress-hod')} className="button">In-Progress (HOD)</button>
        <button onClick={() => handleSectionChange('accepted')} className="button">Accepted</button>
        <button onClick={() => handleSectionChange('rejected')} className="button">Rejected</button>
      </div>

      <section id="in-progress-advisor-section" className={`od-section ${activeSection === 'in-progress-advisor' ? 'visible' : 'hidden'}`}>
        <h2>In-Progress (Advisor) OD Details</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Section</th>
              <th>Year</th>
              <th>Reason</th>
              <th>Applied Date</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace the following with dynamic data */}
            {/* Example data */}
            {/* {results.studentod.map(item => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.rollno}</td>
                <td>{item.classs}</td>
                <td>{item.section}</td>
                <td>{item.presentyear}</td>
                <td>{item.reason}</td>
                <td>{item.applieddate}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>{item.total_days}</td>
                <td><a href={`/viewdetails8/${item.id}`} className="button view">View Details</a></td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </section>

      <section id="in-progress-hod-section" className={`od-section ${activeSection === 'in-progress-hod' ? 'visible' : 'hidden'}`}>
        <h2>In-Progress (HOD) OD Details</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Section</th>
              <th>Year</th>
              <th>Reason</th>
              <th>Applied Date</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace the following with dynamic data */}
            {/* Example data */}
            {/* {results.accept.map(item => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.rollno}</td>
                <td>{item.classs}</td>
                <td>{item.section}</td>
                <td>{item.presentyear}</td>
                <td>{item.reason}</td>
                <td>{item.applieddate}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>{item.total_days}</td>
                <td><a href={`/viewdetails8.5/${item.id}`} className="button view">View Details</a></td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </section>

      <section id="accepted-section" className={`od-section ${activeSection === 'accepted' ? 'visible' : 'hidden'}`}>
        <h2>Accepted OD Details</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Section</th>
              <th>Year</th>
              <th>Reason</th>
              <th>Applied Date</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace the following with dynamic data */}
            {/* Example data */}
            {/* {results.accepted.map(item => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.rollno}</td>
                <td>{item.classs}</td>
                <td>{item.section}</td>
                <td>{item.presentyear}</td>
                <td>{item.reason}</td>
                <td>{item.applieddate}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>{item.total_days}</td>
                <td><a href={`/viewdetails9/${item.id}`} className="button view">View Details</a></td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </section>

      <section id="rejected-section" className={`od-section ${activeSection === 'rejected' ? 'visible' : 'hidden'}`}>
        <h2>Rejected OD Details</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Section</th>
              <th>Year</th>
              <th>Reason</th>
              <th>Applied Date</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Rejected By</th>
              <th>Reason of Rejection</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace the following with dynamic data */}
            {/* Example data */}
            {/* {results.rejected.map(item => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.rollno}</td>
                <td>{item.classs}</td>
                <td>{item.section}</td>
                <td>{item.presentyear}</td>
                <td>{item.reason}</td>
                <td>{item.applieddate}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>{item.total_days}</td>
                <td>HOD</td>
                <td>{item.reasonofrejection}</td>
                <td><a href={`/viewdetails10/${item.id}`} className="button view">View Details</a></td>
              </tr>
            ))}
            {results.rejected1.map(item => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.rollno}</td>
                <td>{item.classs}</td>
                <td>{item.section}</td>
                <td>{item.presentyear}</td>
                <td>{item.reason}</td>
                <td>{item.applieddate}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>{item.total_days}</td>
                <td>Advisor</td>
                <td>{item.reasonofrejection}</td>
                <td><a href={`/viewdetails11/${item.id}`} className="button view">View Details</a></td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Previousod;
