import { useState } from "react";
import "./App.css";
import HomePage from "./Components/Home/Homepage";
import NavigationBar from "./Components/Home/NavBar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div>
      <NavigationBar />
      <Outlet/>
      <HomePage />
    </div>
  );
}

export default App;
