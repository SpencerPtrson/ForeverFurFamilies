import { Button, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const authed = useSelector((state) => state.isAuth);
  const userCheck = async () => {
    // console.log("Calling userCheck in app.jsx");
    const { data } = await axios.get("/userCheck");
    // console.log("Data from userCheck:", data);
    if (data.email) {
      dispatch({
        type: "LOGIN",
        payload: {
          email: data.email,
          firstName: data.firstName,
          isAdmin: data.isAdmin,
          success: data.success,
          userId: data.userId,
          isAuth: data.isAuth,
        },
      });
    }
  };

  useEffect(() => {
    userCheck();
  }, []);

  return (
    <div>
      <nav>
        <NavLink to="/" className="item" activeClassName="active">
          ForeverFur Families
        </NavLink>

        {authed ? (
          <>
            <NavLink to="/UserProfile" className="item" activeClassName="active">
              User Profile
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="item" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/register" className="item" activeClassName="active">
              Register
            </NavLink>
          </>
        )}

        <div className="item">
          All pets
          <div className="dropdown">
            <div>
              <NavLink to="/allPets?type=Dog">Dogs</NavLink>
              <NavLink to="/allPets?type=Cat">Cats</NavLink>
              <NavLink to="/allPets?type=Other">Other animals</NavLink>
            </div>
          </div>
        </div>
        <NavLink to="/meetTheTeam" className="item" activeClassName="active">
          Meet the team
        </NavLink>
        <NavLink to="/successStory" className="item" activeClassName="active">
          Success Stories
        </NavLink>
        <div className="underline"></div>
      </nav>
    </div>
  );
};

export default NavigationBar;
