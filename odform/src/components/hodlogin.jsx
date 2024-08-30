import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/hodlogin.css'
function HodLogin() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {   
      const response = await axios.post('http://localhost:4000/hodlogin', {
        email,
        password,
      });

      if (response.data.success) {
        navigate('/hodhome');
      } else {
        setMsg(response.data.message); // Assuming the backend sends a 'message' in case of an error
      }
    } catch (error) {
      console.error('Login failed', error);
      setMsg('An error occurred. Please try again.');
    }
  };

  // Auto-hide validation message after 3 seconds
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg('');
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when msg changes
    }
  }, [msg]);

  return (
    <>
      {/* Changed from <a> to <Link> */}
      <Link to="/" className="button back-to-home">Back to Home</Link>

      <div className="login-container">
        <h1>HOD Login</h1>
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            {msg && <p id="validation-message" className="validation-message">{msg}</p>}

            <label htmlFor="hod-email">Email:</label>
            <input type="email" id="hod-email" name="email" required />

            <label htmlFor="hod-password">Password:</label>
            <input type="password" id="hod-password" name="password" required />

            <button type="submit">Login</button>
          </form>
          <p className="signup-link">Forgot password? <Link to="/forgotpasswordhod">Click here to change password.</Link></p>
          <p className="signup-link">Don't have an account? <Link to="/hodsignup">Sign up here</Link></p>
        </div>
      </div>
    </>
  );
}

export default HodLogin;
