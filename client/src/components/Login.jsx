import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const loginMutation = useMutation((formData) =>
        axios.post('http://localhost:3000/auth/login', JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    );

    const handleLogin = () => {
        const formData = {
            username,
            password,
        };
        loginMutation.mutate(formData);
    };

    if (loginMutation.isSuccess) {
        // Handle successful login, e.g., redirect to another page
        console.log('Login successful!');
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={handleUsernameChange} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button onClick={handleLogin} disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
};

export default LoginScreen;
