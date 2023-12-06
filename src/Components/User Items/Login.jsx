import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('attempting try')
            const response = await axios.post('http://localhost:8000/api/login', { email, password });

            if (response.data.success) {
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        userId: response.data.userId,
                        username: response.data.username,
                    }
                });

                navigate('/UserProfile')
            } else {
                alert('Invalid credentials')
            }
        } catch (error) {
            console.error('Login error', error);
        }
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}