import { Carousel, Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./SpecificPet.css";
import styled from "styled-components";
import PetCards from "./PetCards";

const StyledText = styled.h1`
  font-family: "Bubblegum Sans", sans-serif;
  font-size: calc(1.375rem + 1.5vw);
`;

const StyledH3 = styled.h3`
  font-family: "Bubblegum Sans", sans-serif;
  font-size: calc(1.3rem + 0.6vw);
`;

const StyledBold = styled.p`
  font-weight: bold;
`;

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
      <Container>
        <Row>
          <Col>
            <Row className="carousel-container">
              <Carousel className="PetDetails">
                <Carousel.Item>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "100vh", backgroundColor: "black" }}
                  >
                    <img
                      className="img-fluid"
                      src={picture}
                      alt={`Slide ${name}`}
                    />
                  </div>
                </Carousel.Item>
              </Carousel>
            </Row>
          </Col>
          <Col>
            <Container>
              <Row>
                <Col>
                  <StyledText>Hi! I'm {name}!</StyledText>
                </Col>
                <Col>
                  <Link to={`/Adoption/${id}`}>
                    <Button variant="primary">Adopt Me!</Button>
                  </Link>
                </Col>
              </Row>
              <p>
                I'm a {species} located in {cityName},{state}.
              </p>

              <Row>
                <StyledH3>Facts about me</StyledH3>
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
                <StyledH3>Medical History</StyledH3>
              </Row>
              <Row>
                <Col>{medicalHistory}</Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
