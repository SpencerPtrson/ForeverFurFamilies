import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SuccessStory.css";

export const SuccessStory = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/api/stories");
        console.log(response.data.stories);
        setStories(response.data.stories);
      } catch (error) {
        console.error("Error fetching stories", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="success-stories-container">
      <h2>Success Stories</h2>
      {stories.length > 0 ? (
        <div>
          {stories.map((story) => (
            <div key={story.storyId} className="story-card">
              <p className="story-content">{story.content}</p>
              <p className="story-date">
                Date: {new Date(story.adoptionDate).toLocaleDateString()}
              </p>
              {story.userSubmittedImage && (
                <img src={story.userSubmittedImage} alt="Story" />
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
