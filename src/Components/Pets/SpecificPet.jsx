import { Carousel, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";

export default function SpecificPet() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const getPet = async () => {
      try {
        const response = await axios.get(`/api/pets/${id}`);
        setPet(response.data.pet);
      } catch (error) {
        console.log("error getting pet", error);
      }
    };
    getPet();
  }, [id]);
  console.log(pet);

  if (!pet) {
    return <div>Loading...</div>;
  }

  const {
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
  } = pet;

  return (
    <>
      <Row>
      <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={picture} alt={`Slide ${name}`} />
          </Carousel.Item>
        </Carousel>
      </Row>

      <Row>
        <Col><h1>Hi! I'm {name}!</h1></Col>
        <Col><Link to="/Adoption">
      <Button variant="primary">Adopt Me!</Button>
    </Link></Col>
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
