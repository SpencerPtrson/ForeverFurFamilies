import { Col, Container, Row, Card } from "react-bootstrap";
import PetCards from "../Pets/PetCards";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PetLocation from "../Pets/PetLocation";
import AllPetsMap from "../Pets/AllPetsMap";
import { Link, useLoaderData } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [seniorPets, setSeniorPets] = useState([]);
  const [story, setStory] = useState([]);
  const [pic, setPic] = useState([]);
  const islogged = useSelector((state) => state.isAuth);
  const [show, setShow] = useState(!islogged);
  // console.log(islogged);
  // console.log(show);

  const { pets } = useLoaderData();
  // console.log("Loader Data:", pets);

  useEffect(() => {
    const getSeniorPets = async () => {
      try {
        const response = await axios.get(`/api/pets/senior`);
        setSeniorPets(response.data.pets);
        // console.log(response.data.pets);
      } catch (error) {
        console.error("error finding pet", error);
      }
    };

    const getStory = async () => {
      try {
        const response = await axios.get(`/api/stories/1`);
        setStory(response.data.story.content);
        setPic(response.data.story.userSubmittedImage);
        // console.log(response.data);
      } catch (error) {
        console.error("error getting story", error);
      }
    };
    getStory();
    getSeniorPets();
  }, []);

  useEffect(() => {
    setShow(!islogged);
  }, [islogged]);

  const petCards = seniorPets.map((pet) => {
    return <PetCards pet={pet} key={pet.petId} />;
  });

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Don't forget to register or login to love your favorite pets!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="text-center justify-content-center">
            <Col>
              <Link to={"/Register"}>
                <Button>Register</Button>
              </Link>
            </Col>
            <Col>
              <Link to={"/login"}>
                <Button>Login</Button>
              </Link>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
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
          <section className="carousel" style={{maxHeight:"65vh"}}>
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
