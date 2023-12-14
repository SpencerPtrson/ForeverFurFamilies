import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const CreateStoryForm = ({ userId, petList }) => {
  const [storyData, setStoryData] = useState({
    content: "",
    adoptionDate: "",
    userSubmittedImage: "",
    petId: "",
  });
  // console.log(storyData);

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setStoryData({ ...storyData, [name]: value });
  };

  const handleStorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/stories/create", { ...storyData, userId });
      setStoryData({
        content: "",
        adoptionDate: "",
        userSubmittedImage: "",
        petId: "",
      });
    } catch (error) {
      console.error("Error submitting story", error);
    }
  };

  const petOptions = petList.map((pet) => {
    return (
      <option key={pet.petId} value={pet.petId}>
        {pet.name}
      </option>
    );
  });

  return (
    <Form onSubmit={handleStorySubmit}>
      <Form.Label>Story Content:</Form.Label>
      <textarea
        name="content"
        onChange={handleStoryChange}
        value={storyData.content}
        required
      />

      <Form.Label>Adoption Date:</Form.Label>
      <input
        type="date"
        name="adoptionDate"
        onChange={handleStoryChange}
        value={storyData.adoptionDate}
        required
      />

      <Form.Label>Image URL:</Form.Label>
      <input
        type="text"
        name="userSubmittedImage"
        onChange={handleStoryChange}
        value={storyData.userSubmittedImage}
      />

      <Form.Label>Select pet</Form.Label>
      <Form.Select
        onChange={handleStoryChange}
        defaultValue={storyData.petId}
        name="petId"
      >
        <option value="" disabled>
          Please choose a pet
        </option>
        {petOptions}
      </Form.Select>

      <button type="submit">Submit Story</button>
    </Form>
  );
};

export default CreateStoryForm;
