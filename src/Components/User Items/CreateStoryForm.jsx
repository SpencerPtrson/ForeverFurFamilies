import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import "./CreateStoryForm.css"

const CreateStoryForm = ({ userId, petList }) => {
  const [storyData, setStoryData] = useState({
    content: "",
    adoptionDate: "",
    userSubmittedImage: "",
    petId: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for tracking submission status

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setStoryData({ ...storyData, [name]: value });
  };

  const handleStorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/stories/create", { ...storyData, userId });
      if (response.status === 200) { 
        setIsSubmitted(true);
        setStoryData({
          content: "",
          adoptionDate: "",
          userSubmittedImage: "",
          petId: "",
        });
      }
    } catch (error) {
      console.error("Error submitting story", error);
      setIsSubmitted(false); 
    }
  };

  const resetForm = () => {
    setIsSubmitted(false); 
    setStoryData({
      content: "",
      adoptionDate: "",
      userSubmittedImage: "",
      petId: "",
    });
  };

  const petOptions = petList.map((pet) => (
    <option key={pet.petId} value={pet.petId}>{pet.name}</option>
  ));

  return (
    <div className="story-form-container">
      {isSubmitted ? (
        <div className="success-message">
          <p>Thank you for sharing your story with us!</p>
          <button onClick={resetForm} className="submit-another-story">Share Another Story</button>
        </div>
      ) : (
        <Form onSubmit={handleStorySubmit} className="story-form">
          <Form.Group>
            <Form.Label>Story Content:</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              onChange={handleStoryChange}
              value={storyData.content}
              required 
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Adoption Date:</Form.Label>
            <Form.Control
              type="date"
              name="adoptionDate"
              onChange={handleStoryChange}
              value={storyData.adoptionDate}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              name="userSubmittedImage"
              onChange={handleStoryChange}
              value={storyData.userSubmittedImage}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Pet:</Form.Label>
            <Form.Control
              as="select"
              onChange={handleStoryChange}
              value={storyData.petId}
              name="petId"
              required
            >
              <option value="disabled">Please choose a pet</option>
              {petOptions}
            </Form.Control>
          </Form.Group>

          <button type="submit" className="submit-story">Submit Story</button>
        </Form>
      )}
    </div>
  );
};

export default CreateStoryForm;
