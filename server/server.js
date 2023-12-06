import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import morgan from "morgan";

// create express instance
const app = express();
const PORT = 8000;

// setup middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: "ssshhhhh",
    saveUninitialized: true,
    resave: false,
  })
);

// Import Handler Functions
import handlerFunctions from "./controller.js";

//#region Users

// Get all users
app.get("/api/users", handlerFunctions.getUsers);

// Get user by Id
app.get("/api/users/:userId", handlerFunctions.getUserById);

// Create new user
app.post("/api/users/create", handlerFunctions.createUser);

// Edit a User
app.put("/api/users/edit/:userId", handlerFunctions.editUser);

// Delete user
app.delete("/api/users/delete/:userId", handlerFunctions.deleteUser);

//#endregion Users

//#region Pets

// Get all pets
app.get("/api/pets", handlerFunctions.getPets);

// Get all not-adopted pets
app.get('/api/pets/notAdopted', handlerFunctions.getNotAdoptedPets)

// Get pet by Id
app.get("/api/pets/:petId", handlerFunctions.getPetById);

// Create new pet
app.post("/api/pets/create", handlerFunctions.createPet);

// Edit a pet
app.put("/api/pets/edit/:petId", handlerFunctions.editPet);

// Delete pet
app.delete("/api/pets/delete/:petId", handlerFunctions.deletePet);

//#endregion Pets

//#region Stories

// Get all stories
app.get("/api/stories", handlerFunctions.getStories);

// Get stories by user id
app.get('/api/stories/users/:userId', handlerFunctions.getStoriesByUserId);

// Get story by Id
app.get("/api/stories/:storyId", handlerFunctions.getStoryById);

// Create new story
app.post("/api/stories/create", handlerFunctions.createStory);

// Edit a story
app.put("/api/stories/edit/:storyId", handlerFunctions.editStory);

// Delete story
app.delete("/api/stories/delete/:storyId", handlerFunctions.deleteStory);

//#endregion Stories

//#region Appointments

// Get all appointments
app.get("/api/appointments", handlerFunctions.getAppointments);

// Get Appointments by UserId
app.get('/api/appointments/users/:userId')

// Get appointment by Id
app.get(
  "/api/appointments/:appointmentId",
  handlerFunctions.getAppointmentById
);

// Create new appointment
app.post("/api/appointments/create", handlerFunctions.createAppointment);

// Edit a appointment
app.put(
  "/api/appointments/edit/:appointmentId",
  handlerFunctions.editAppointment
);

// Delete appointment
app.delete(
  "/api/storieappointmentss/delete/:appointmentId",
  handlerFunctions.deleteAppointment
);

//#endregion Appointments
