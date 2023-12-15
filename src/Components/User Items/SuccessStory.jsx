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
      <h2 className="success-stories-header">Success Stories</h2>
      <div className="stories-grid">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story.storyId} className="story-card">
              <img src={story.userSubmittedImage} alt="Success Story" />
              <div className="story-content">{story.content}</div>
              <div className="story-date">
                Date: {new Date(story.adoptionDate).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <p>No success stories available.</p>
        )}
      </div>
    </div>
  )
 };