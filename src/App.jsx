import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import HomePage from "./Components/Home/Homepage";
import NavigationBar from "./Components/Home/NavBar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Footer from "./Components/Home/Footer";

function App() {



  return (
    <div>
      <NavigationBar />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default App;
