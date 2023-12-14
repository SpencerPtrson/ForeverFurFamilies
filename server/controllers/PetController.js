import { Pet } from "../database/models.js";

export const petHandlerFunctions = {
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

  getAdoptedPetsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      const pets = await Pet.findAll({
        where: {
          hasBeenAdopted: true,
          userId: userId,
        },
      });
      res.json({ success: true, pets });
    } catch (error) {
      console.log("Unable to get pet by id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getSeniorPets: async (req, res) => {
    try {
      let pets = await Pet.findAll({
        where: { hasBeenAdopted: false },
      });
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
      } = req.body;

      // console.log(
      //   `Creating pet ${name} with species: ${species}, breed: ${breed}, age: ${age}, state: ${state},
      //        cityName: ${cityName}, medicalHistory (not displayed here), personalHistory (not displayed here),
      //        hasBeenAdopted: ${hasBeenAdopted}, and images: ${images}.`
      // );

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
        picture,
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
      pet.picture = picture;

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
      // console.log(`Attempting to delete pet with id: ${petId}`);
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
};