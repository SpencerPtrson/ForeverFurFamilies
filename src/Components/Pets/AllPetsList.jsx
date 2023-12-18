import React, { useState, useEffect } from "react";
import PetCards from "./PetCards";
import "./AllPets.css";
import axios from "axios";
import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

export default function AllPetsList({ type }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const petType = searchParams.get("type");
  const [pets, setPets] = useState([]);
  const [petData, setPetData] = useState([]);
  const [filters, setFilters] = useState({
    age: "",
    species: petType,
    location: "",
  });

  useEffect(() => {
    setFilters({
      ...filters,
      species: petType,
    });
  }, [location]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    axios
      .get("/api/pets/notAdopted")
      .then((response) => {
        setPets(response.data.pets);
        setPetData(response.data.pets);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
      });
  }, []);

  const filteredPets = petData.filter((pet) => {
    return (
      (filters.age === "" || pet.age === filters.age) &&
      (filters.species === "" ||
        (filters.species === "Other" &&
          !["Dog", "Cat"].includes(pet.species)) ||
        pet.species === filters.species) &&
      `${pet.cityname}, ${pet.state}`
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    );
  });

  const petCards = filteredPets.map((pet) => {
    return <PetCards pet={pet} key={pet.petId} />;
  });

  return (
    <>
      <Container className="pb-4">
        <Row className="justify-content-end">
          <Col xs={12} sm={6} md={4} className="ml-auto">
            <Form className="custom-form ml-auto">
              <Form.Label></Form.Label>
              <Form.Select
                value={filters.age}
                onChange={(e) => handleFilterChange("age", e.target.value)}
              >
                <option value="" disabled hidden>
                  Choose an Age
                </option>
                <option value="">Any Age</option>
                <option value="Baby">Baby</option>
                <option value="Young">Young</option>
                <option value="Adult">Adult</option>
                <option value="Senior">Senior</option>
              </Form.Select>
            </Form>
          </Col>

          <Col xs={12} sm={6} md={4} className="ml-auto">
            <Form className="custom-form ml-auto">
              <Form.Label></Form.Label>
              <Form.Select
                value={filters.species}
                onChange={(e) => handleFilterChange("species", e.target.value)}
              >
                <option value="" disabled hidden>
                  Choose a Species
                </option>
                <option value="">Any Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form>
          </Col>

          <Col xs={12} sm={6} md={4} className="ml-auto">
            <Form className="custom-form ml-auto">
              <Form.Label></Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {petCards.map((card, index) => (
            <div key={index} className="col">
              {card}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
