import { Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div>
      <nav>
        <Link to="/" className="item">
          ForeverFur Families
        </Link>
        <Link to="/login" className="item">
          Login
        </Link>
        <Link to="/register" className="item">
          Register
        </Link>
        <div className="item">
          All pets
          <div className="dropdown">
            <div>
              <Link to="/allPets" type="dog">Dogs</Link>
              <Link to="/allPets">Cats</Link>
              <Link to="/allPets">Other animals</Link>
            </div>
          </div>
        </div>
        <Link to="/meetTheTeam" className="item">
          Meet the team
        </Link>
        <Link to="/successStory" className="item">
          Success Stories
        </Link>
        <div className="underline"></div>
      </nav>
    </div>
  );
};

export default NavigationBar;
