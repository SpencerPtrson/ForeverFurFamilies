import { Col, Container, Row, Card } from "react-bootstrap";
import PetCards from "../Pets/PetCards";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AllPetsMap from "../Pets/AllPetsMap";
import { Link, useLoaderData } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import HeroSection from "./HeroSection";
import PetsRehomedCounter from "./PetsRehomedCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [seniorPets, setSeniorPets] = useState([]);
  const [story, setStory] = useState([]);
  const [pic, setPic] = useState([]);
  const islogged = useSelector((state) => state.isAuth);
  const [show, setShow] = useState(!islogged);
  // console.log(islogged);
  // console.log(show);

  const { pets, adoptedPetCount } = useLoaderData();
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

      <HeroSection />
      
      <div className="homepage-banner">
      </div>

      <Container>
        <Row>
          <div class="d-flex justify-content-center carousel-header">
            <h1>Featured Pets</h1>
          </div>
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
        </Container>
        
        
        <Container fluid className="success-stories">
        <Container>         
        <Row>
        <div class="d-flex justify-content-center success-title">
          <h1>Success Stories</h1>
          </div>
          <Col className="left-col">
            

            
              <div className="d-flex align-items-center counter">
                <h2>Pets reHomed</h2>
                <PetsRehomedCounter />
              </div>
            
                
          </Col>

          <Col>
          <div class="d-flex justify-content-center success">

          
          <div className="d-flex align-items-center">
          <img src={pic} alt="Bingo's Success Story" width="100%" height="100%" />
          </div></div>
          </Col>
          <Col className="right-col d-flex align-items-center">
          
            <div className="d-flex align-self-center quote">
            
            <div class="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faQuoteLeft} size="2xl" style={{color: "#ffffff",}} />
                </div>
                
              {story}!


            </div>
            
          
           </Col>
        </Row>
        </Container> 
        </Container>       

        <Container>
        <Row>
          <Col>
          <div class="d-flex justify-content-center search">
            <h1>Search for Pets in Your Area</h1>
          </div>
            <AllPetsMap petList={pets} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
