import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector(state => state.userId)

    useEffect(() =>{

        if (userId !== "") {
            navigate('/UserProfile')
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Attempting Login')
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            console.log(response.data);
            if (response.data.success) {
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        userId: response.data.userId,
                        email: response.data.email,
                        firstName: response.data.firstName,
                        profilePicture: response.data.profilePicture,
                        isAdmin: response.data.isAdmin
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
        <div className='register-container'>
        <form onSubmit={(e) => handleSubmit(e)} className="register-form">
            <h2>Login</h2>
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
        </div>
    )
}