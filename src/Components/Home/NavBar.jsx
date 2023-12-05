import { Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
      <Navbar bg="dark" data-bs-theme="dark" className="justify-content">
        <Navbar.Brand>ForeverFur Families</Navbar.Brand>
        <Link to="/login">
            <Button> Login</Button>
        </Link>
        <Link to='/register'>
            <Button>Register</Button>
        </Link>
        <Link to='/allPets'>
            <Button> All pets</Button>
        </Link>
        <Link to='/meetTheTeam'>
            <Button> Meet the team</Button>
        </Link>
        <Link to='/successStory'>
            <Button> Success stories</Button>
        </Link>
      </Navbar>
  );
};

export default NavigationBar