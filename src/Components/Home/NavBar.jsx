import { Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const NavigationBar = () => {
  const dispatch = useDispatch();

  const userCheck = async () => {
    console.log("Calling userCheck in app.jsx");
    const { data } = await axios.get('/userCheck');
    console.log("Data from userCheck:", data);
    if (data.email) {
      dispatch({
        type: 'LOGIN',
        payload: { email: data.email, firstName: data.firstName, isAdmin: data.isAdmin, success: data.success, userId: data.userId, isAuth: data.isAuth }
      })
    }
  }

  useEffect(() => {
    userCheck()
  }, []);


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
              <Link to="/allPets?type=Dog">Dogs</Link>
              <Link to="/allPets?type=Cat">Cats</Link>
              <Link to="/allPets?type=Other">Other animals</Link>
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
