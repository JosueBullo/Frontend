import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Correct import for React Router v6
import { Link } from 'react-router-dom';  // Import the Link component
import './Login.css'; // Assuming you'll create a separate CSS file for styles

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const decodeTokenManually = (token) => {
        try {
            const base64Url = token.split(".")[1]; // Get payload part of the token
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const decodedData = JSON.parse(window.atob(base64));
            console.log("Decoded Token:", decodedData);
            return decodedData;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
            
            const userInfo = decodeTokenManually(response.data.access);
            console.log("User Info:", userInfo);

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('userId', userInfo.user_id);
            setMessage("Login successful!");
            navigate('/'); // Navigate to homepage or dashboard after successful login
        } catch (error) {
            setMessage("Login failed. Please check your credentials.");
        }
    };

    // Handle the Exit button click to navigate back to the dashboard
    const handleExit = () => {
        navigate('/');  // Redirect to the dashboard (or home page)
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                {message && <p className="message">{message}</p>}

                {/* Text Link to Register page */}
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>

                {/* Exit button to go back to dashboard */}
                <div className="exit-button">
                    <button onClick={handleExit} className="exit-btn">
                        Exit to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
