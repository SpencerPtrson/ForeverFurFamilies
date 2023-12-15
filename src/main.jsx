import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./Components/PrivateRoutes.jsx";
import { UserProfile } from "./Components/User Items/UserProfile.jsx";
import { Adoption } from "./Components/User Items/Adoption.jsx";
import { MeetTheTeam } from "./Components/User Items/MeetTheTeam.jsx";
import { Login } from "./Components/User Items/Login.jsx";
import { Register } from "./Components/User Items/Register.jsx";
import { SuccessStory } from "./Components/User Items/SuccessStory.jsx";
import AllPetsList from "./Components/Pets/AllPetsList.jsx";
import SpecificPet from "./Components/Pets/SpecificPet.jsx";
import NavigationBar from "./Components/Home/NavBar.jsx";
import HomePage from "./Components/Home/Homepage.jsx";

import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "*",
        element: <PrivateRoutes />,
        children: [
          {
            path: "UserProfile",
            element: <UserProfile />,
          },
          {
            path: "Adoption/:id",
            element: <Adoption />,
          },
        ],
      },
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const res = await axios.get("/api/pets");
          const adoptedPetRes = await axios.get('/api/pets/count/adopted');
          // console.log("Main.jsx - loader:", res.data.pets);
          return { pets: res.data.pets, adoptedPetCount: adoptedPetRes.data.count };
        },
      },
      {
        path: "/meetTheTeam",
        element: <MeetTheTeam />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/successStory",
        element: <SuccessStory />,
      },
      {
        path: "/AllPets",
        element: <AllPetsList />,
      },
      {
        path: "/SpecificPet/:id",
        element: <SpecificPet />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
