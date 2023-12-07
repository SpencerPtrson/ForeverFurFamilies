import { Carousel } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useLoaderData } from "react-router";

export default function SpecificPet() {
  const { petId } = useParams();

  const {
    pet: {
      name,
      species,
      breed,
      age,
      gender,
      picture,
      medicalHistory,
      personality,
      cityName,
      state,
    },
  } = useLoaderData();

  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("/api/pets")
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  return (
    <>
      <Row>
        <Carousel>
          {pets.map((pet) => (
            <Carousel.Item key={petId}>
              <img
                className="d-block w-100"
                src={picture}
                alt={`Slide ${name}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>

      <Row>
        <h1>Hi! I'm {name}!</h1>
      </Row>
      <p>
        I'm a {species} located in {cityName},{state}.
      </p>

      <Row>
        <h3>Facts about me</h3>
      </Row>
      <Row>
        <Col>Breed: {breed}</Col>
        <Col>Gender: {gender}</Col>
      </Row>
      <Row>
        <Col>Age: {age}</Col>
        <Col>Personality: {personality}</Col>
      </Row>

      <Row>
        <h3>Medical History</h3>
      </Row>
      <Row>{medicalHistory}</Row>
    </>
  );
}
