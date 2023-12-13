import React, { useState } from 'react';
import axios from 'axios';

const CreateStoryForm = ({ userId }) => {
    const [storyData, setStoryData] = useState({
        content: '',
        adoptionDate: '',
        userSubmittedImage: '',
        petId: '',
    });

    const handleStoryChange = (e) => {
        const { name, value } = e.target;
        setStoryData({ ...storyData, [name]: value })
    };

    const handleStorySubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/stories/create', { ...storyData, userId });
            setStoryData({
                content: '',
                adoptionDate: '',
                userSubmittedImage: '',
                petId: '',
            });
        } catch (error) {
            console.error('Error submitting story', error);
        }
    }

    return (
        <form onSubmit={handleStorySubmit}>
            <label>Story Content:</label>
            <textarea name="content" onChange={handleStoryChange} value={storyData.content} required />

            <label>Adoption Date:</label>
            <input type="date" name="adoptionDate" onChange={handleStoryChange} value={storyData.adoptionDate} required />
            
            <label>Image URL:</label>
            <input type="text" name="userSubmittedImage" onChange={handleStoryChange} value={storyData.userSubmittedImage} />

            <label>Pet ID (optional):</label>
            <input type="number" name="petId" onChange={handleStoryChange} value={storyData.petId} />

            <button type="submit">Submit Story</button>
        </form>
    );
};

export default CreateStoryForm;