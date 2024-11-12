import React, { useState } from 'react';
import './app.css';
import loginimg from './gym.png';

const Login = ({ onAuth, toggleForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('Login successful!');
                onAuth(); // Call the authentication function
            } else {
                setMessage(data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ display: "flex", width: "100%" }}>
                <img src={loginimg} width="100%" alt="gym" />
            </div>
            <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <form onSubmit={handleLogin} style={{ justifyContent: "center", height: "100vh" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "25px", justifyContent: "center", alignItems: "center" }}>
                                <h1>Welcome Back!</h1>
                                <p>Please Login Here</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                                <button type="submit" style={{ width: "70%", boxShadow: "2px 2px 15px rgb(50, 173, 250)" }}>Login</button>
                                {message && <p>{message}</p>}
                                <p>
                                    Don't have an account?{' '}
                                </p>
                                <button type="button" onClick={toggleForm} style={{ width: "18%", padding: "10px 0px" }}>Sign Up here</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
