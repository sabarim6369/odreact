import React, { useEffect, useState } from 'react';
import '../css/studentlogin.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Studentlogin({ msg }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        
        if (msg) {
            const validationMessage = document.getElementById('validation-message');
            if (validationMessage) {
                setTimeout(() => {
                    validationMessage.style.display = 'none';
                }, 3000);
            }
        }
    }, [msg]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(''); 
        try {
            const response = await axios.post("http://localhost:4000/studentlogin", { email, password });
            console.log(response.data);

            if (response.data.success) {
                navigate('/studenthome', { state: response.data }); 
            } else {
              
                setErr(response.data.msg || 'An unexpected error occurred');
            }
        } catch (error) {
            console.error("Error:", error);
          
            setErr(error.response?.data?.msg || 'An error occurred while logging in');
        }
    };

    return (
        <div className="login-container">
            <h1>Student Login</h1>
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    {/* Display server validation or error messages */}
                    {msg && <p id="validation-message" className="validation-message">{msg}</p>}
                    {err && <p className="error-message">{err}</p>}
                    
                    <label htmlFor="student-email">Email:</label>
                    <input
                        type="email"
                        id="student-email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="student-password">Password:</label>
                    <input
                        type="password"
                        id="student-password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="signup-link">
                    Forgot password? <Link to="/forgotpassword">click here</Link>
                </p>
                <p className="signup-link">
                    Don't have an account? <Link to="/studentsignup">Sign up here</Link>
                </p>
            </div>
            <Link to="/" className="button back-to-home">Back to Home</Link>
        </div>
    );
}

export default Studentlogin;
