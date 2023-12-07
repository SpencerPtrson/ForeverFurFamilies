import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const UserProfile = () => {
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useSelector((state) => state.userId)

    console.log(formData)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/api/users/${userId}`);
                setFormData(response.data.user);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data', error);
                setError(error);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/users/edit/${userId}`, formData);
            toggleEditMode();
        } catch (error) {
            console.error('Update Error', error);
        };

        if (isLoading) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>Error Loading Profile</div>
        }
    }

    return (
        <div>
            <h1>User Profile</h1>
            {isEditMode ? (
                <form onSumbit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={toggleEditMode}>Cancel</button>
                </form>
            ) : (
                <div>
                <p>First Name: {formData.firstName}</p>
                <p>Last Name: {formData.lastName}</p>
                <p>Email: {formData.email}</p>
                <p>Phone Number: {formData.phoneNumber}</p>
                <button onClick={toggleEditMode}>Edit</button>
            </div>
            )}
        </div>
    );
};

