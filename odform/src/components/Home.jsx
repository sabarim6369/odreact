import React from 'react'
import '../css/home.css'
import {Link} from 'react-router-dom'
function Home() {
  return (
    <>
    <div className="container">
    <div className="college-header">
        <h1>📕Sri Eshwar College of Engineering📙</h1>
    </div>
    <h1 className="welcome-text">❤️Hearty welcome!!❤️</h1>
    <div className="login-options">
        <Link to="/studentLogin" className="login-link student-login-link">
            <h2>Student Login</h2>
            <p>Enter here if you are a student</p>
            </Link>
        <Link to="/teacherlogin" className="login-link teacher-login-link">
            <h2>Teacher Login</h2>
            <p>Enter here if you are a teacher</p>
        </Link>
        <Link to="/hodlogin" className="login-link hod-login-link">
            <h2>HOD Login</h2>
            <p>Enter here if you are the Head of Department</p>
        </Link>
    </div>
</div>

    </>
  )
}

export default Home
