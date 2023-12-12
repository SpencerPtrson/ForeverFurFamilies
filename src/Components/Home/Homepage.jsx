import { Col, Container, Row, Card } from "react-bootstrap";
import PetCards from "../Pets/PetCards";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PetLocation from "../Pets/PetLocation";
import AllPetsMap from "../Pets/AllPetsMap";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
  const [seniorPets, setSeniorPets] = useState([]);
  const [story, setStory] = useState([]);
  const [pic, setPic] = useState([]);

  const { pets } = useLoaderData();
  console.log("Loader Data:", pets);

  useEffect(() => {
    const getSeniorPets = async () => {
      try {
        const response = await axios.get(`/api/pets`);
        setSeniorPets(response.data.pets);
        console.log(response.data.pets);
      } catch (error) {
        console.error("error finding pet", error);
      }
    };
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
    getSeniorPets();
  }, []);

  const petCards = seniorPets.map((pet) => {
    return <PetCards pet={pet} key={pet.petId} />;
  });

  return (
    <>
    <div className="homepage-banner">
        <h1>Welcome to the ForeverFur Families WebPage</h1>
        <p>Find your new best friend today!</p>
      </div>
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
      <Row>
        <Col>
          <AllPetsMap petList={pets} />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default HomePage;
