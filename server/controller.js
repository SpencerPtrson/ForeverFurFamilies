import {
  User,
  Pet,
  Story,
  Appointment,
  FavoritePet,
} from "./database/models.js";
import bcryptjs from "bcryptjs";

import session from "express-session";

const handlerFunctions = {
  //#region AccountManagement
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
      console.log("Attempting Login");
      const user = await User.scope("withPassword").findOne({
        where: { email },
      });
      console.log(user);

      if (!user) {
        console.log("User not found");
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      const isMatch = bcryptjs.compareSync(password, user.password);
      console.log("password value:", password);
      console.log("user password value:", user.password);
      console.log("is match value:");
      console.log(isMatch);

      if (!isMatch) {
        console.log("Incorrect Password");
        return res
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      }

      // REPLACE WITH COOKIES EVENTUALLY
      req.session.userId = user.userId;
      req.session.email = user.email;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.phoneNumber = user.phoneNumber;
      req.session.profilePicture = user.profilePicture;
      req.session.isAdmin = user.isAdmin;

      res.json({
        success: true,
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        profilePicture: user.profilePicture,
        isAdmin: user.isAdmin
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("Internal server error");
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.json({ success: true });
  },

  userCheck: async (req, res) => {
    try {
      console.log("User Check called!");
      if (req.session.userId) {
        console.log("Session userId is valid.");
        const user = await User.findByPk(req.session.userId);
        console.log("Found User: ", user);

        res.send({
          success: true,
          userId: user?.userId ?? null,
          email: user?.email ?? null,
          firstName: user?.firstName ?? null,
          isAdmin: user?.isAdmin ?? false
        });
      } else {
        console.log("No session.userId available.");
        res.send({
          success: false,
          userId: null,
          email: null,
          firstName: null,
          isAdmin: false
        });
      }
    } catch (error) {
      console.log("User check failed");
      console.log("Error:", error);
    }
  },

  //#endregion AccountManagement

  //#region Users

  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        order: [["userId", "ASC"]],
      });
      res.json({ success: true, users });
    } catch (error) {
      console.log("Unable to get users.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(+userId);
      console.log(user)
      res.json({ success: true, user });
    } catch (error) {
      console.log("Unable to get user by id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  createUser: async (req, res) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
      } = req.body;

      console.log(
        `Creating user ${firstName} ${lastName} with email: ${email}, password: ${password}, phone: ${phoneNumber}, and profilePicURL: ${profilePicture}`
      );
      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
      });

      // REPLACE WITH COOKIES
      req.session.userId = newUser.userId;
      req.session.email = newUser.email;
      req.session.firstName = newUser.firstName;
      req.session.lastName = newUser.lastName;
      req.session.phoneNumber = newUser.phoneNumber;
      req.session.profilePicture = newUser.profilePicture;
      req.session.isAdmin = false;

      res.json({ success: true, newUser });
    } catch (error) {
      console.log("Unable to create account");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  editUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
      } = req.body;

      const user = await User.findByPk(userId);
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      user.phoneNumber = phoneNumber;
      user.profilePicture = profilePicture;
      await user.save();

      res.json({ success: true, user });
    } catch (error) {
      console.log("Unable to edit account");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.body;
      console.log(`Attempting to delete user with id: ${userId}`);
      const deletedUser = await User.destroy({
        where: { userId: userId },
      });
      res.json({ success: true, deletedUser });
    } catch (error) {
      console.log("Unable to delete user.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  //#endregion Users

  //#region Pets

  getPets: async (req, res) => {
    try {
      const pets = await Pet.findAll({
        order: [["name", "ASC"]],
      });
      res.json({ success: true, pets });
    } catch (error) {
      console.log("Unable to get pets.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getNotAdoptedPets: async (req, res) => {
    try {
      const pets = await Pet.findAll({
        where: { hasBeenAdopted: false },
      });
      res.json({ success: true, pets });
    } catch (error) {
      console.log("Unable to get adoptable pets.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getSeniorPets: async (req, res) => {
    try {
      let pets = await Pet.findAll();
      pets = pets.filter((pet) => /senior/gi.test(pet.age));
      res.json({ success: true, pets });
    } catch (error) {
      console.log("Unable to get senior pets.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getPetById: async (req, res) => {
    try {
      const { petId } = req.params;
      const pet = await Pet.findByPk(petId);
      res.json({ success: true, pet });
    } catch (error) {
      console.log("Unable to get pet by id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  createPet: async (req, res) => {
    try {
      const {
        name,
        species,
        breed,
        age,
        state,
        cityName,
        medicalHistory,
        personalHistory,
        hasBeenAdopted,
        images,
      } = req.body;

      console.log(
        `Creating pet ${name} with species: ${species}, breed: ${breed}, age: ${age}, state: ${state},
         cityName: ${cityName}, medicalHistory (not displayed here), personalHistory (not displayed here),
         hasBeenAdopted: ${hasBeenAdopted}, and images: ${images}.`
      );

      // Create new pet without images
      const newPet = await Pet.create({
        name,
        species,
        breed,
        age,
        state,
        cityName,
        medicalHistory,
        personalHistory,
        hasBeenAdopted,
      });

      // ASSIGN IMAGES THROUGH AN IMAGE ASSOCIATION TABLE?
      res.json({ success: true, newPet });
    } catch (error) {
      console.log("Unable to create pet");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  editPet: async (req, res) => {
    try {
      const { petId } = req.params;
      const {
        name,
        species,
        breed,
        age,
        state,
        cityName,
        medicalHistory,
        personalHistory,
        hasBeenAdopted,
        images,
      } = req.body;

      const pet = await Pet.findByPk(petId);
      pet.name = name;
      pet.species = species;
      pet.breed = breed;
      pet.age = age;
      pet.state = state;
      pet.cityName = cityName;
      pet.medicalHistory = medicalHistory;
      pet.personalHistory = personalHistory;
      pet.hasBeenAdopted = hasBeenAdopted;

      // NEED TO EDIT CORRESPONDING IMAGES IN AN IMAGE TABLE
      await pet.save();

      res.json({ success: true, pet });
    } catch (error) {
      console.log("Unable to edit pet");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  deletePet: async (req, res) => {
    try {
      const { petId } = req.body;
      console.log(`Attempting to delete pet with id: ${petId}`);
      const deletedPet = await Pet.destroy({
        where: { petId: petId },
      });
      res.json({ success: true, deletedPet });
    } catch (error) {
      console.log("Unable to delete pet.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  //#endregion Pets

  //#region Stories

  getStories: async (req, res) => {
    try {
      const stories = await Story.findAll({
        order: [["userId", "ASC"]],
      });
      res.json({ success: true, stories });
    } catch (error) {
      console.log("Unable to get stories.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getStoriesByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const stories = await Story.findAll({
        where: { userId: userId },
      });
      res.json({ success: true, stories });
    } catch (error) {
      console.log("Unable to get stories.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getStoryById: async (req, res) => {
    try {
      const { storyId } = req.params;
      const story = await Story.findByPk(storyId);
      res.json({ success: true, story });
    } catch (error) {
      console.log("Unable to get story by id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  createStory: async (req, res) => {
    try {
      const { content, adoptionDate, userSubmittedImage, petId } = req.body;
      console.log(
        `Creating story for pet with id ${petId} with adoptionDate ${adoptionDate} and an imgURL.`
      );

      // Create new pet
      const newStory = await Story.create({
        content,
        adoptionDate,
        userSubmittedImage,
      });

      // Find the appropriate pet to assign and assign it
      const pet = await Pet.findByPk(petId);
      await newStory.setPet(pet);

      res.json({ success: true, newStory });
    } catch (error) {
      console.log("Unable to create story");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  editStory: async (req, res) => {
    try {
      const { storyId } = req.params;
      const { content, adoptionDate, userSubmittedImage, petId } = req.body;

      // Edit story fields
      const story = await Story.findByPk(storyId);
      story.content = content;
      story.adoptionDate = adoptionDate;
      story.userSubmittedImage = userSubmittedImage;

      // set story's pet
      const pet = await Pet.findByPk(petId);
      await story.setPet(pet);

      await story.save();

      res.json({ success: true, story });
    } catch (error) {
      console.log("Unable to edit story");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  deleteStory: async (req, res) => {
    try {
      const { storyId } = req.body;
      console.log(`Attempting to delete story with id: ${storyId}`);
      const deletedStory = await Story.destroy({
        where: { storyId: storyId },
      });
      res.json({ success: true, deletedStory });
    } catch (error) {
      console.log("Unable to delete story.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  //#endregion Stories

  //#region Appointments
  getAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.findAll({
        order: [["date", "DESC"]],
      });
      res.json({ success: true, appointments });
    } catch (error) {
      console.log("Unable to get appointments.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getAppointmentsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const appointments = await Appointment.findAll({
        where: { userId: userId },
      });
      res.json({ success: true, appointments });
    } catch (error) {
      console.log("Unable to get appointments.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getAppointmentById: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const appointment = await Appointment.findByPk(appointmentId);
      res.json({ success: true, appointment });
    } catch (error) {
      console.log("Unable to get appointment by id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  createAppointment: async (req, res) => {
    try {
      const { date, userId, petId } = req.body;
      console.log(
        `Creating appointment for pet with id ${petId} with appointment date ${date} for user with userId ${userId}.`
      );

      // Create new story
      const newAppointment = await Appointment.create({
        date,
      });

      // Find the appropriate pet to assign and assign them
      const pet = await Pet.findByPk(petId);
      await newAppointment.setPet(pet);

      // Find the appropriate user to assign to the appointment and assign them
      const user = await User.findByPk(userId);
      await newAppointment.setUser(user);

      res.json({ success: true, newAppointment });
    } catch (error) {
      console.log("Unable to create appointment");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  editAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { date, userId, petId } = req.body;

      // Edit appointment fields
      const appointment = await Appointment.findByPk(appointmentId);
      appointment.date = date;

      // set appointment's pet
      const pet = await Pet.findByPk(petId);
      await appointment.setPet(pet);

      // Set appointment's user (person setting up the appointment)
      const user = await User.findByPk(userId);
      await appointment.setUser(user);

      await appointment.save();

      res.json({ success: true, appointment });
    } catch (error) {
      console.log("Unable to edit appointment");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.body;
      console.log(`Attempting to delete appointment with id: ${appointmentId}`);
      const deletedAppointment = await Appointment.destroy({
        where: { appointmentId: appointmentId },
      });
      res.json({ success: true, deletedAppointment });
    } catch (error) {
      console.log("Unable to delete appointment.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },
  //#endregion Appointments

  //#region FavoritePets
  getAllFavoritePets: async (req, res) => {
    try {
      const favoritePets = await FavoritePet.findAll({
        order: [["petId", "ASC"]],
      });
      res.json({ success: true, favoritePets });
    } catch (error) {
      console.log("Unable to get favorited pets.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getFavoritePetsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      let favoritePets = await FavoritePet.findAll({
        where: { userId: userId },
      });
      res.json({ success: true, favoritePets });
    } catch (error) {
      console.log("Unable to get favorited pets by user Id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getUsersByFavoritePetId: async (req, res) => {
    try {
      const { petId } = req.params;
      // Get all instances of a pet being favorited
      const instancesOfFavoritePet = await FavoritePet.findAll({
        where: { petId: petId },
      });

      // iterate through instancesOfFavoritePet and save users to a list
      const userArr = [];
      for (const petInstance of instancesOfFavoritePet) {
        userArr.push(await User.findByPk(petInstance.userId));
      }

      res.json({ success: true, userArr });
    } catch (error) {
      console.log("Unable to get users by favorite pet id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  createFavoritePet: async (req, res) => {
    try {
      const { userId, petId } = req.body;
      console.log(userId);
      console.log("Pet Id:", petId);
      const user = await User.findByPk(userId);
      const pet = await Pet.findByPk(petId);

      const newFavoritePetInstance = await FavoritePet.create();
      newFavoritePetInstance.setUser(user);
      newFavoritePetInstance.setPet(pet);

      res.json({ success: true, newFavoritePetInstance });
    } catch (error) {
      console.log("Unable to create favorite pet instance.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  deleteFavoritePet: async (req, res) => {
    try {
      const { favoritePetId } = req.params;
      console.log(
        `Attempting to delete favorite pet instance with favoritePetId: ${favoritePetId}`
      );
      const deletedFavoritePet = await FavoritePet.destroy({
        where: { favoritePetId: favoritePetId },
      });

      res.json({ success: true, deletedFavoritePet });
    } catch (error) {
      console.log("Unable to delete favorited pet.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  //#endregion FavoritePets
};

export default handlerFunctions;
