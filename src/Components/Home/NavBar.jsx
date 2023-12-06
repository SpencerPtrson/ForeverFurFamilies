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
              <Link to="/allPets">Dogs</Link>
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
    //   <Navbar bg="dark" data-bs-theme="dark" className="justify-content">
    //     <Navbar.Brand>ForeverFur Families</Navbar.Brand>
    //     <Link to="/login">
    //         <Button> Login</Button>
    //     </Link>
    //     <Link to='/register'>
    //         <Button>Register</Button>
    //     </Link>
    //     <Link to='/allPets'>
    //         <Button> All pets</Button>
    //     </Link>
    //     <Link to='/meetTheTeam'>
    //         <Button> Meet the team</Button>
    //     </Link>
    //     <Link to='/successStory'>
    //         <Button> Success stories</Button>
    //     </Link>
    //   </Navbar>
  );
};

export default NavigationBar;
