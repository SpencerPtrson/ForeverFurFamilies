import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import HomePage from "./Components/Home/Homepage";
import NavigationBar from "./Components/Home/NavBar";
import { Outlet } from "react-router-dom";
import axios from "axios";

function App() {



  return (
    <div>
      <NavigationBar />
      <Outlet/>
    </div>
  );
}

export default App;
