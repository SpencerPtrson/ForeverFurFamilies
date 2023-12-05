import { User, Pet, Story, Appointment } from "./database/models";

const handlerFunctions = {
  //#region Users
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        order: [["email", "ASC"]],
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
      const user = await User.findByPk(userId);
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
        profilePicURL,
      } = req.body;

      console.log(
        `Creating user ${firstName} ${lastName} with email: ${email}, password: ${password}, phone: ${phoneNumber}, and profilePicURL: ${profilePicURL}`
      );
      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        profilePicURL,
      });

      // REPLACE WITH COOKIES
      req.session.userId = newUser.userId;
      req.session.email = newUser.email;
      req.session.firstName = newUser.firstName;
      req.session.lastName = newUser.lastName;
      req.session.phoneNumber = newUser.phoneNumber;
      req.session.profilePicURL = newUser.profilePicURL;

      res.json({ success: true, newUser });
    } catch (error) {
      console.log("Unable to create account");
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
      console.log("Unable to create account");
      console.log("Error", error);
      res.json({ success: false, error: error });
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
      res.json({ success: false, error: error });
    }
  },
  //#endregion Pets

  //#region Stories

  //#endregion Stories

  //#region Appointments

  //#endregion Appointments
};
