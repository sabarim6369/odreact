import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import{Link} from 'react-router-dom'
import '../css/teacherlogin.css'

function TeacherLogin() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
    
  const response=await axios.post("http://localhost:4000/teacherlogin",{email,password})

      if (response.data.success) {
        navigate('/teacherhome');
      } else {
        setMsg(response.data.message);
      }
    } catch (error) {
      console.error('Login failed', error);
      setMsg(error.response?.data?.msg);
    }
  };

  return (
    <div className="login-container">
      <h1>Teacher Login</h1>
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          {msg && <p id="validation-message" className="validation-message">{msg}</p>}

          <label htmlFor="teacher-email">Email:</label>
          <input type="email" id="teacher-email" name="email" required />

          <label htmlFor="teacher-password">Password:</label>
          <input type="password" id="teacher-password" name="password" required />

          <button type="submit">Login</button>
        </form>
        <p>Forgot password? <Link to="/forgotpasswordteacher">Click here</Link></p>
        <p className="signup-link">Don't have an account? <Link to="/teachersignup">Sign up here</Link></p>
      </div>

      <Link to="/" className="button back-to-home">Back to Home</Link>
    </div>
  );
}

export default TeacherLogin;
