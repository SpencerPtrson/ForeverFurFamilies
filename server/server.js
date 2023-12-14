import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import morgan from "morgan";
import bcryptjs from "bcryptjs";
import { User } from "./database/models.js";
import env from "dotenv";

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
env.config();

// Import Handler Functions
import { userHandlerFunctions } from "./controllers/UserController.js";
import { petHandlerFunctions } from "./controllers/PetController.js";
import { storyHandlerFunctions } from "./controllers/StoryController.js";
import { appointmentHandlerFunctions } from "./controllers/AppointmentController.js";
import { favoritePetHandlerFunctions } from "./controllers/FavoritePetController.js";
import accountManagementHandlerFunctions from "./controllers/AccountManagementController.js";

//#region AccountManagement

// User authentication
app.post("/api/login", accountManagementHandlerFunctions.login);

// Check if session id has corresponding user
app.get("/userCheck", accountManagementHandlerFunctions.userCheck);

// Update user information and check password
app.post('/api/appointmentCheck',accountManagementHandlerFunctions.appointmentCheck)

//#endregion AccountManagement

//#region Users

// Get all users
app.get("/api/users", userHandlerFunctions.getUsers);

// Get user by Id
app.get("/api/users/:userId", userHandlerFunctions.getUserById);

// Create new user
app.post("/api/users/create", userHandlerFunctions.createUser);

// Edit a User
app.put("/api/users/edit/:userId", userHandlerFunctions.editUser);

// Delete user
app.delete("/api/users/delete/:userId", userHandlerFunctions.deleteUser);

//#endregion Users

//#region Pets

// Get all pets
app.get("/api/pets", petHandlerFunctions.getPets);

// Get all adopted pets
app.get('/api/pets/adopted', petHandlerFunctions.getAdoptedPets);

// Get all not-adopted pets
app.get("/api/pets/notAdopted", petHandlerFunctions.getNotAdoptedPets);

// Get adopted pets by userId
app.get(
  "/api/pets/adopted/:userId",
  petHandlerFunctions.getAdoptedPetsByUserId
);

// Get all senior pets
app.get("/api/pets/senior", petHandlerFunctions.getSeniorPets);

// Get pet by Id
app.get("/api/pets/:petId", petHandlerFunctions.getPetById);

// Create new pet
app.post("/api/pets/create", petHandlerFunctions.createPet);

// Edit a pet
app.put("/api/pets/edit/:petId", petHandlerFunctions.editPet);

// Delete pet
app.delete("/api/pets/delete/:petId", petHandlerFunctions.deletePet);

//#endregion Pets

//#region Stories

// Get all stories
app.get("/api/stories", storyHandlerFunctions.getStories);

// Get stories by user id
app.get("/api/stories/users/:userId", storyHandlerFunctions.getStoriesByUserId);

// Get story by Id
app.get("/api/stories/:storyId", storyHandlerFunctions.getStoryById);

// Create new story
app.post("/api/stories/create", storyHandlerFunctions.createStory);

// Edit a story
app.put("/api/stories/edit/:storyId", storyHandlerFunctions.editStory);

// Delete story
app.delete("/api/stories/delete/:storyId", storyHandlerFunctions.deleteStory);

//#endregion Stories

//#region Appointments

// Get all appointments
app.get("/api/appointments", appointmentHandlerFunctions.getAppointments);

// Get Appointments by UserId
app.get(
  "/api/appointments/users/:userId",
  appointmentHandlerFunctions.getAppointmentsByUserId
);

// Get appointment by Id
app.get(
  "/api/appointments/:appointmentId",
  appointmentHandlerFunctions.getAppointmentById
);

// Create new appointment
app.post(
  "/api/appointments/create",
  appointmentHandlerFunctions.createAppointment
);

// Edit a appointment
app.put(
  "/api/appointments/edit/:appointmentId",
  appointmentHandlerFunctions.editAppointment
);

// Delete appointment
app.delete(
  "/api/storieappointmentss/delete/:appointmentId",
  appointmentHandlerFunctions.deleteAppointment
);

//#endregion Appointments

//#region FavoritePets
// Get all favorite pets
app.get("/api/favoritePets", favoritePetHandlerFunctions.getAllFavoritePets);

// Get all pets favorited by a user
app.get(
  "/api/favoritePets/users/:userId",
  favoritePetHandlerFunctions.getFavoritePetsByUserId
);

// Get all users who favorited a pet
app.get(
  "/api/favoritePets/pets/:petId",
  favoritePetHandlerFunctions.getUsersByFavoritePetId
);

// Create new pet
app.post(
  "/api/favoritePets/create",
  favoritePetHandlerFunctions.createFavoritePet
);

// Delete pet
app.delete(
  "/api/favoritePets/delete/:favoritePetId",
  favoritePetHandlerFunctions.deleteFavoritePet
);

//#endregion FavoritePets

ViteExpress.listen(app, PORT, () => {
  console.log(`server is live at PORT http://localhost:${PORT}`);
});
