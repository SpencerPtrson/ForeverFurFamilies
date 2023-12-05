import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./Components/PrivateRoutes.jsx";
import { UserProfile } from "./Components/User Items/UserProfile.jsx";
import { Adoption } from "./Components/User Items/Adoption.jsx";
import { MeetTheTeam } from "./Components/User Items/MeetTheTeam.jsx";
import { Login } from "./Components/User Items/Login.jsx";
import { Register } from "./Components/User Items/Register.jsx";
import { SuccessStory } from "./Components/User Items/SuccessStory.jsx";

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
            path: "Adoption",
            element: <Adoption />,
          },
        ],
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
    ],
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
  //* Will be added after next commit
  // {
  //   path: "/AllPets",
  //   element: <AllPetsList />,
  // },
  // {
  //   path: "/SpecificPet",
  //   element: <SpecificPet />,
  // },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
