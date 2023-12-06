import { User, Pet, Story, Appointment, db } from "./models.js";

const specificSpeciesPets = await Pet.findAll({
  where: {
    species: "Dog",
  },
});

console.log(specificSpeciesPets);
