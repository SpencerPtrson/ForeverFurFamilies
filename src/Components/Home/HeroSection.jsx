import { Row, Col, Container } from "react-bootstrap";
import "./HeroSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faCat, faPaw } from "@fortawesome/free-solid-svg-icons";


export default function HeroSection() {
    return (
      <>
      <Container fluid className="hero">
        <Container>
        <div class="d-flex justify-content-center hero1">

        <div className="d-flex align-items-center title">
            
            <h1>Find your family's forever friend</h1> 
            <h5>Search our database of pets</h5>

            
            <div className="d-flex align-items-center petsearch">
                <a href="http://localhost:8000/allPets?type=Dog">
                <div className="d-flex align-items-center mx-3 square">
                <FontAwesomeIcon icon={faDog} size="2x" style={{ color: "#1010c2" }} />
                <div className="d-flex align-items-end petsquare"><p>Dogs</p></div>
                </div></a>

                <a href="http://localhost:8000/allPets?type=Cat">
                <div className="d-flex align-items-center mx-3 square">
                <FontAwesomeIcon icon={faCat} size="2x" style={{ color: "#1010c2" }} />
                <div className="d-flex align-items-end petsquare"><p>Cats</p></div>
                </div></a>

                <a href="http://localhost:8000/allPets?type=Other">
                <div className="d-flex align-items-center mx-3 square">
                <FontAwesomeIcon icon={faPaw} size="2x" style={{ color: "#1010c2" }} />
                <div className="d-flex align-items-end petsquare"><p>Other Animals</p></div>
                </div></a>
            
            </div>
        </div>

        </div>
        </Container>

      </Container>
      </>
    );
  }