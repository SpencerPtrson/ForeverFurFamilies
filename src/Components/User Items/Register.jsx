import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const userData = {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/users/create', userData);
            console.log('User registered successfully', response.data);
            navigate('/login')
        } catch (error) {
            console.error('Registration error', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up Now</h2>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number"/>
            <button type="submit">Register</button>
        </form>
    );
};