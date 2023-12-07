import { Col, Container, Row, Card } from "react-bootstrap";
import PetCards from "../Pets/PetCards";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [seniorPets, setSeniorPets] = useState([]);
  const [story, setStory] = useState([]);
  const [pic, setPic] = useState([]);

  useEffect(() => {
    const getSeniorPets = async () => {
      try {
        const response = await axios.get(`/api/pets/senior`);
        setSeniorPets(response.data.pets);
        console.log(response.data.pets);
      } catch (error) {
        console.error("error finding pet", error);
      }
    };
    getSeniorPets();
  }, []);

  useEffect(() => {
    const getStory = async () => {
      try {
        const response = await axios.get(`/api/stories/1`);
        setStory(response.data.story.content);
        setPic(response.data.story.userSubmittedImage);
        console.log(response.data);
      } catch (error) {
        console.error("error getting story", error);
      }
    };
    getStory();
  }, []);

  const petCards = seniorPets.map((pet) => {
    return <PetCards pet={pet} key={pet.petId} />;
  });

  return (
    <Container>
      <Row>
        <Col>
          Total pets reHomed
          <br />
          INSERT NUMBER
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={pic} />
            <Card.Body>{story}</Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <section className="carousel">
          <ol className="carousel_viewport">
            {petCards.map((card, index) => (
              <li key={index} className="carousel_slide">
                <div className="carousel_snapper">{card}</div>
              </li>
            ))}
          </ol>
        </section>
      </Row>
    </Container>
  );
};

export default HomePage;
