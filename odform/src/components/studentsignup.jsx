import React, { useState, useEffect } from 'react';
import '../css/studentsignup.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function StudentSignup() {
  const [formData, setFormData] = useState({
    username: '',
    classhandling: '',
    section: '',
    rollno: '',
    year: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState('');
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setValidationMessage('Passwords do not match!');
      return false;
    }
    if (formData.password.length < 8) {
      setValidationMessage('Password must be at least 8 characters long.');
      return false;
    }
    if (formData.rollno.trim() === '') {
      setValidationMessage('Roll Number is required.');
      return false;
    }

    setValidationMessage('');
    return true;
  };

  useEffect(() => {
    if (validationMessage) {
      const validationMessageElement = document.getElementById('validation-message');
      if (validationMessageElement) {
        setTimeout(() => {
          validationMessageElement.style.display = 'none';
        }, 3000);
      }
    }
  }, [validationMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:4000/studentsignup", formData);
      console.log('Response:', response.data);
      setValidationMessage('');
      setErr('');
      if (response.data.success) {
        navigate("/studentlogin");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      setErr(error.response?.data?.msg || 'An error occurred while signing up');
    }
  };

  return (
    <div className="signup-container">
      <h1>Create a Student Account</h1>
      <div className="signup-card">
        {validationMessage && (
          <p id="validation-message" className="validation-message">
            {validationMessage}
          </p>
        )}
        {err && (
          <p className="validation-message">{err}</p>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="signup-username">Username:</label>
          <input
            type="text"
            id="signup-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-classhandling">Class:</label>
          <select
            id="signup-classhandling"
            name="classhandling"
            value={formData.classhandling}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a class</option>
            <option value="CSE">CSE</option>
            <option value="AIDS">AIDS</option>
            <option value="ECE">ECE</option>
          </select>

          <label htmlFor="signup-section">Section:</label>
          <select
            id="signup-section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <label htmlFor="signup-rollno">Roll Number:</label>
          <input
            type="text"
            id="signup-rollno"
            name="rollno"
            value={formData.rollno}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-year">Year:</label>
          <select
            id="signup-year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            id="signup-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="signup-confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/studentlogin">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default StudentSignup;
