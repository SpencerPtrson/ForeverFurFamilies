import { Pet } from "../database/models.js";
import axios from "axios";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const petHandlerFunctions = {
  getPetCountAdopted: async (req, res) => {
    try {
      const count = await Pet.findAndCountAll({
        where: { hasBeenAdopted: true },
      });
      console.log(count);
      res.json({ success: true, count: count.count });
    } catch (error) {
      console.log("Unable to get adopted pet count.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

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

  getAdoptedPets: async (req, res) => {
    try {
      const pets = await Pet.findAll({
        where: { hasBeenAdopted: true },
      });
      res.json({ success: true, pets });
    } catch (error) {
      console.log("Unable to get adopted pets.");
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

  getPetsByAgeGroups: async (req, res) => {
    try {
      // Get Boolean age key-value pairs from req.body
      const { baby, young, adult, senior } = req.body;
      console.log("Baby:", baby);
      console.log("Young:", young);
      console.log("Adult:", adult);
      console.log("Senior:", senior);
      const filterArr = [];
      if (baby) filterArr.push('baby');
      if (young) filterArr.push('young');
      if (adult) filterArr.push('adult');
      if (senior) filterArr.push('senior');
      const pets = await Pet.findAll({
        where: {
          hasBeenAdopted: false,
        },
      });
      // filter pets based on key value pairs
      console.log(filterArr);

      const regexArr = [];
      for (const filter of filterArr) {
        const regex = new RegExp(filter, 'gi');
        regexArr.push(regex);
      }

      const filteredPets = [];
      for (const pet of pets) {
        for (const regex of regexArr) {
          console.log("Testing", regex, "for", pet.name)
          if (regex.test(pet.age)) {
            filteredPets.push(pet);
            break;
          }
        }
      }
      filteredPets.sort((pet) => pet.name)

      res.json({ success: true, pets: filteredPets });
    } catch (error) {
      console.log("Unable to get pets by age groups.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getBabyPets: async (req, res) => {
    try {
      let pets = await Pet.findAll({
        where: { hasBeenAdopted: false },
      });
      pets = pets.filter((pet) => /baby/gi.test(pet.age));
      res.json({ success: true, pets });
    } catch (error) {
      console.log("Unable to get senior pets.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getYoungPets: async (req, res) => {
    try {
      let pets = await Pet.findAll({
        where: { hasBeenAdopted: false },
      });
      pets = pets.filter((pet) => /young/gi.test(pet.age));
      res.json({ success: true, pets });
    } catch (error) {
      console.log("Unable to get senior pets.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getAdultPets: async (req, res) => {
    try {
      let pets = await Pet.findAll({
        where: { hasBeenAdopted: false },
      });
      pets = pets.filter((pet) => /adult/gi.test(pet.age));
      res.json({ success: true, pets });
    } catch (error) {
      console.log("Unable to get senior pets.");
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
    // console.log("Creating Pet");

    let replacementImage =
      "https://clipartcraft.com/images/paw-print-clip-art-transparent-8.png";
    let catImage =
      "https://img.freepik.com/premium-vector/cat-vector-illustration-black-white-cat-coloring-book-page-children_160901-6328.jpg?w=740";
    let dogImage =
      "https://i.pinimg.com/originals/62/c3/05/62c305a9e793feb3dffd53c6a448c3f9.png";

    try {
      const {
        name,
        species,
        breed,
        age,
        gender,
        picture,
        state,
        cityName,
        zipCode,
        spayed_neutered,
        house_trained,
        declawed,
        special_needs,
        shots_current,
        personality,
      } = req.body;

      if (/cat/gi.test(species)) replacementImage = catImage;
      else if (/dog/gi.test(species)) replacementImage = dogImage;

      const isPictureFormat = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
        picture
      );

      let medicalHistory = "";
      medicalHistory += `${name} is${
        spayed_neutered ? " " : " not "
      }spayed-neutered.\n`;
      medicalHistory += `${name} is ${
        house_trained ? "" : "not"
      } house trained.\n`;
      medicalHistory += `${name} is ${
        declawed || null ? "" : "not"
      } declawed.\n`;
      medicalHistory += `${name} does ${
        special_needs || null ? "" : "not"
      } have special needs.\n`;
      medicalHistory += `${name} is ${
        shots_current || null ? "" : "not"
      } up to date on their shots.\n`;

      let geocodeRes = await axios.get(
        `https://geocode.maps.co/search?city=${cityName}&state=${state}`
      );
      // console.log("Geocode result data:", geocodeRes.data);
      // console.log("Result Length:", geocodeRes.data.length)

      if (geocodeRes.data === null || geocodeRes.data.length < 1) {
        await sleep(2000);
        geocodeRes = await axios.get(
          `https://geocode.maps.co/search?&state=${state}`
        );
        // console.log("New geocode data:", geocodeRes.data);
      }

      // Create new pet without images
      const newPet = await Pet.create({
        name: name.slice(0,1).toUpperCase() + name.slice(1),
        species,
        breed,
        age,
        gender,
        picture: isPictureFormat ? picture : replacementImage,
        state: state ?? null,
        zipCode: null,
        cityName: cityName ?? null,
        medicalHistory: medicalHistory,
        personality,
        hasBeenAdopted: true,
        latitude: geocodeRes?.data[0]?.lat ?? 0,
        longitude: geocodeRes?.data[0]?.lon ?? 0,
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
