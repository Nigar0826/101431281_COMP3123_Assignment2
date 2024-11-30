import React, { useState } from 'react';
import { signup } from '../services/apiMethods';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup({ username, email, password });
            alert('Signup successful! Please log in.');
            window.location.href = '/login'; // Redirect to Login
        } catch (error) {
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h1>Signup</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
