import React, { useState } from "react";
import PetCards from "./PetCards";
import { useSearchParams } from "react-router-dom";

export default function AllPetsList({ type }) {
  // const [searchParams] = useSearchParams();
  // const filter = searchParams.get("filter")
  const pets = [
    {
      petId: "1",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
      name: "Fido",
      species: "Dog",
      breed: "Golden Retriever",
      cityname: "Miami",
      state: "Florida",
      gender: "male",
      age: "3 months",
    },
    {
      petId: "2",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
      name: "Fido",
      species: "Dog",
      breed: "Golden Retriever",
      cityname: "Orem",
      state: "Utah",
      gender: "male",
      age: "3 months",
    },
    {
      petId: "3",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
      name: "Fido",
      species: "Dog",
      breed: "Golden Retriever",
      cityname: "Chicago",
      state: "Illinois",
      gender: "male",
      age: "6 months",
    },
    {
      petId: "4",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
      name: "Fido",
      species: "Dog",
      breed: "Golden Retriever",
      cityname: "Preston",
      state: "Idaho",
      gender: "male",
      age: "8 months",
    },
  ];

  const [petData, setPetData] = useState(pets);

  const [filters, setFilters] = useState({
    age: "",
    species: "",
    location: "",
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };
  const filteredPets = petData.filter((pet) => {
    return (
      pet.age.includes(filters.age) &&
      pet.species.toLowerCase().includes(filters.species.toLowerCase()) &&
      `${pet.cityname}, ${pet.state}`
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    );
  });

  const petCards = filteredPets.map((pet) => {
    return <PetCards pet={pet} key={pet.petId} />;
  });

  return (
    <div>
      <div>
        <label>
          Age:
          <input
            type="text"
            value={filters.age}
            onChange={(e) => handleFilterChange("age", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Species:
          <input
            type="text"
            value={filters.species}
            onChange={(e) => handleFilterChange("species", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </label>
      </div>
      <div className="row row-cols-4 row-cols-md-4">{petCards}</div>
    </div>
  );
}
