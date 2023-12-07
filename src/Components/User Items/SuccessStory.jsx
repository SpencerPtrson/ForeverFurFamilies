import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const SuccessStory = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('/api/stories');
                console.log(response.data.stories)
                setStories(response.data.stories);
                
            } catch (error) {
                console.error('Error fetching stories', error);
            }
        };

        fetchStories();
    }, []);

    return (
        <div>
            <h2>Success Stories</h2>
            {stories.length > 0 ? (
                <div>
                    {stories.map(story => (
                        <div key={story.storyId}>
                            <p>{story.content}</p>
                            <p>Date: {new Date(story.adoptionDate).toLocaleDateString()}</p>
                            {story.userSubmittedImage && (
                                <img src={story.userSubmittedImage} alt="Story" style={{ maxWidth: '100%' }} />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No success stories available.</p>
            )}
        </div>
    );
};
