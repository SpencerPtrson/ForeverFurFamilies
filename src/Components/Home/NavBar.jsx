import { Button, Navbar } from "react-bootstrap";
import { NavLink,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const authed = useSelector((state) => state.isAuth);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const userCheck = async () => {
    const { data } = await axios.get("/userCheck");
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
  useEffect(()=>{
    setMenuOpen(false)
  },[location])

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div
        className={`hamburger-menu${menuOpen ? " open" : ""}`}
        onClick={handleToggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <nav className={`nav-menu${menuOpen ? " open" : ""}`}>
        <NavLink to="/" className="item" activeClassName="active">
          ForeverFur Families
        </NavLink>

        {authed ? (
          <>
            <NavLink
              to="/UserProfile"
              className="item"
              activeClassName="active"
            >
              User Profile
            </NavLink>
            <NavLink to="/RehomePet" className="item" activeClassName="active">
              Rehome a Pet
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

        <div className={`item${menuOpen ? " open" : ""}`}>
          All pets
          <div className={`dropdown`}>
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
