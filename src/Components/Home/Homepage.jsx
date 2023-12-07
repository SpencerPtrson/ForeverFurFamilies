import { Col, Container, Row } from "react-bootstrap";
import PetCards from "../Pets/PetCards";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [seniorPets, setSeniorPets] = useState([]);

  useEffect(() => {
    const getSeniorPets = async () => {
      try {
        const response = await axios.get(`/api/pets/senior`);
        setSeniorPets(response.data.pets);
        console.log(response.data.pets)
      } catch (error) {
        console.error("error finding pet", error);
      }
    };
    getSeniorPets();
  }, []);

  const petCards = seniorPets.map((pet) => {
    return <PetCards pet={pet} key={pet.petId} />;
  });

  return (
    <Container>
      <section className="carousel">
        <ol className="carousel_viewport">
          {petCards.map((card, index) => (
            <li key={index} className="carousel_slide">
              <div className="carousel_snapper">{card}</div>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
};

export default HomePage;
