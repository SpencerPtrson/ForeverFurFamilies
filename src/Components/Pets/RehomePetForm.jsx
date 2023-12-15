import React, { useState } from "react";
import axios from "axios";
import { Form, FormCheck } from "react-bootstrap";

const RehomePetForm = ({ userId }) => {
  const [petInfo, setPetInfo] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    picture: "",
    state: "AL",
    cityName: "",
    zipCode: "",
    spayed_neutered: false,
    house_trained: false,
    declawed: false,
    special_needs: false,
    shots_current: false,
    personality: "",
  });

  const handlePetInfoChange = (e) => {
    const { name, value } = e.target;
    console.log("Name of clicked element:", name);
    console.log("Value:", value);

    console.log(e.target);
    if (
      name === "spayed_neutered" ||
      name === "house_trained" ||
      name === "declawed" ||
      name === "special_needs" ||
      name === "shots_current"
    ) {
      setPetInfo({ ...petInfo, [name]: !petInfo[name] });
      return;
    }

    setPetInfo({ ...petInfo, [name]: value });
  };

  console.log("Pet Info:", petInfo);

  const handlePetInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Pet Info sent to API:", petInfo);
      const response = await axios.post("/api/pets/create", { ...petInfo, userId });
      console.log(response.data);
      setPetInfo({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        picture: "",
        state: "AL",
        cityName: "",
        zipCode: "",
        spayed_neutered: false,
        house_trained: false,
        declawed: false,
        special_needs: false,
        shots_current: false,
        personality: "",
      });
    } catch (error) {
      console.error("Error submitting pet info", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Unable to provide a good home for your pets?
      </h1>
      <h1 style={{ textAlign: "center" }}>
        Re-Home them to give them a better life!
      </h1>
      <Form onSubmit={handlePetInfoSubmit} className="story-form">
        <Form.Label>What's your pet's personality?</Form.Label>
        <textarea
          name="personality"
          onChange={handlePetInfoChange}
          value={petInfo.content}
          required
        />

        <Form.Label>Pet Name</Form.Label>
        <input
          type="text"
          name="name"
          onChange={handlePetInfoChange}
          value={petInfo.name}
          required
        />

        <Form.Label>What species is your pet?</Form.Label>
        <Form.Select
          value={petInfo.species}
          name="species"
          onChange={handlePetInfoChange}
          required
        >
          <option value="" disabled hidden>
            Choose a species
          </option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Hamster">Hamster</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Bird">Bird</option>
          <option value="Fish">Fish</option>
          <option value="Horse">Horse</option>
          <option value="Lizard">Lizard</option>
          <option value="Snake">Snake</option>
          <option value="Turtle">Turtle</option>
        </Form.Select>

        <Form.Label>What breed is your pet?</Form.Label>
        <input
          type="text"
          name="breed"
          onChange={handlePetInfoChange}
          value={petInfo.breed}
          required
        />

        <Form.Label>Choose an age range</Form.Label>
        <Form.Select
          value={petInfo.age}
          name="age"
          onChange={handlePetInfoChange}
          required
        >
          <option value="" disabled hidden>
            Choose an Age
          </option>
          <option value="Baby">Baby</option>
          <option value="Young">Young</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
        </Form.Select>

        <Form.Label>What sex is your pet?</Form.Label>
        <Form.Select
          value={petInfo.gender}
          name="gender"
          onChange={handlePetInfoChange}
          required
        >
          <option value="" disabled hidden>
            Choose a sex
          </option>
          <option value="Baby">Male</option>
          <option value="Young">Female</option>
        </Form.Select>

        <Form.Label>Pet Image URL</Form.Label>
        <input
          type="text"
          name="picture"
          onChange={handlePetInfoChange}
          value={petInfo.picture}
        />

        <Form.Label>Where is your pet located?</Form.Label>
        <Form.Label>Location will default to State if an invalid city is given.</Form.Label>
        <input
          type="text"
          name="cityName"
          onChange={handlePetInfoChange}
          value={petInfo.cityName}
          placeholder="City Name Only"
          required
        />

        <Form.Select
          value={petInfo.state}
          name="state"
          onChange={handlePetInfoChange}
          required
        >
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </Form.Select>

        <Form.Label>Medical Details</Form.Label>

        <div className="checkList">
          <div className="list-container">
            <div>
              <span>Has your pet been spayed and neutered?</span>
              <FormCheck
                name="spayed_neutered"
                onChange={handlePetInfoChange}
              />
            </div>

            <div>
              <span>Has your pet been house trained?</span>
              <FormCheck name="house_trained" onChange={handlePetInfoChange} />
            </div>

            <div>
              <span>Has your pet been declawed? (leave blank if N/A)</span>
              <FormCheck name="declawed" onChange={handlePetInfoChange} />
            </div>

            <div>
              <span>Does your pet have special needs?</span>
              <FormCheck name="special_needs" onChange={handlePetInfoChange} />
            </div>

            <div>
              <span>Is your pet up to date on their shots?</span>
              <FormCheck name="shots_current" onChange={handlePetInfoChange} />
            </div>
          </div>
        </div>

        <button type="submit">Submit Pet</button>
      </Form>
    </div>
  );
};

export default RehomePetForm;
