import { User, Pet, Story, Appointment, db } from "./models.js";
import axios from "axios";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function seed() {
  console.log("Syncing database...");
  await db.sync({ force: true });

  let replacementImage =
    "https://clipartcraft.com/images/paw-print-clip-art-transparent-8.png";
  let catImage =
    "https://img.freepik.com/premium-vector/cat-vector-illustration-black-white-cat-coloring-book-page-children_160901-6328.jpg?w=740";
  let dogImage =
    "https://i.pinimg.com/originals/62/c3/05/62c305a9e793feb3dffd53c6a448c3f9.png";

  let bingoImage =
    "https://res.cloudinary.com/deaxecn0z/image/upload/v1702420642/Bingo_utvu9f.jpg";

  let chitzoImage =
    "https://res.cloudinary.com/deaxecn0z/image/upload/v1702421701/kitty_gnshnv.jpg";

  console.log("Seeding Users table...");
  const users = [
    {
      email: "spencer@example.com",
      password: "password",
      phoneNumber: "555-1234",
      firstName: "Spencer",
      lastName: "Peterson",
      profilePicture: "profile1.jpg",
    },
    {
      email: "wyatt@example.com",
      password: "password",
      phoneNumber: "555-5678",
      firstName: "Wyatt",
      lastName: "Thayer",
      profilePicture: "profile2.jpg",
    },
    {
      email: "justin@example.com",
      password: "password",
      phoneNumber: "555-4321",
      firstName: "Justin",
      lastName: "Nelson",
      profilePicture: "profile3.jpg",
    },
    {
      email: "tito@example.com",
      password: "password",
      phoneNumber: "555-8765",
      firstName: "Tito",
      lastName: "Nanni",
      profilePicture: "profile4.jpg",
    },
  ];

  for (const userData of users) {
    await User.create(userData);
  }

  console.log("Seeding Pets table...");
  const pets = [
    {
      name: "Bingo",
      species: "Dog",
      breed: "Labrador Retriever",
      age: "2",
      gender: "Male",
      picture: bingoImage,
      state: "Utah",
      zipCode: "84117",
      cityName: "Millcreek",
      medicalHistory: "Fully vaccinated, neutered",
      personality: "Friendly and loves to play fetch",
      hasBeenAdopted: true,
      latitude: 40.0,
      longitude: -111.850769,
    },
    {
      name: "Blue",
      species: "Cat",
      breed: "Siamese",
      age: "Senior",
      gender: "Male",
      picture: catImage,
      state: "Utah",
      zipCode: "84663",
      cityName: "Springville",
      medicalHistory: "Fully vaccinated",
      personality: "Timid and friendly",
      hasBeenAdopted: true,
      latitude: 40.1,
      longitude: -111.850769,
    },
    {
      name: "Thor",
      species: "Cat",
      breed: "Orange",
      age: "Senior",
      gender: "Male",
      picture: catImage,
      state: "Utah",
      zipCode: "84043",
      cityName: "Lehi",
      medicalHistory: "Fully vaccinated, has one eye",
      personality: "Very friendly and patient",
      hasBeenAdopted: true,
      latitude: 40.2,
      longitude: -111.850769,
    },
    {
      name: "Chitzo",
      species: "Cat",
      breed: "Black",
      age: "Senior",
      gender: "Male",
      picture: chitzoImage,
      state: "Utah",
      zipCode: "84117",
      cityName: "Millcreek",
      medicalHistory: "Fully vaccinated, neutered",
      personality: "Friendly with humans and dogs",
      hasBeenAdopted: true,
      latitude: 40.3,
      longitude: -111.850769,
    },
    {
      name: "Charlie",
      species: "Dog",
      breed: `Crocker Spaniel`,
      age: "Senior",
      gender: "Male",
      picture: dogImage,
      state: "Utah",
      zipCode: "84093",
      cityName: "Sandy",
      medicalHistory: "Fully vaccinated",
      personality: "Trusting and loyal",
      hasBeenAdopted: false,
      latitude: 40.391617,
      longitude: -111.8,
    },
    {
      name: "Bailey",
      species: "Dog",
      breed: "Boxer",
      age: "Senior",
      gender: "Female",
      picture: dogImage,
      state: "Utah",
      zipCode: "84047",
      cityName: "Midvale",
      medicalHistory: "Fully vaccinated, not spayed",
      personality: "Energetic and playful",
      hasBeenAdopted: false,
      latitude: 40.391617,
      longitude: -111.9,
    },
    {
      name: "Daisy",
      species: "Dog",
      breed: "German Shepherd",
      age: "Senior",
      gender: "Female",
      picture: dogImage,
      state: "Utah",
      zipCode: "84009",
      cityName: "South Jordan",
      medicalHistory: "Fully vaccinated, spayed",
      personality: "Laidback and affectionate",
      hasBeenAdopted: false,
      latitude: 40.391617,
      longitude: -112,
    },
    {
      name: "Max",
      species: "Dog",
      breed: "Bulldog",
      age: "Senior",
      gender: "Male",
      picture: dogImage,
      state: "UT",
      zipCode: "84097",
      cityName: "Provo",
      medicalHistory: "Fully vaccinated",
      personality: "Independent and timid",
      hasBeenAdopted: false,
      latitude: 41,
      longitude: -112,
    },
  ];

  for (const petData of pets) {
    await Pet.create(petData);
  }

  console.log("Seeding Stories table...");
  const stories = [
    {
      content:
        "Bingo has been such a joy to our family! He provides us so much energy and love",
      adoptionDate: new Date(),
      userSubmittedImage: bingoImage,
      userId: 4,
    },
    {
      content:
        "Blue has been the perfect addition to our family, we are so happy he is apart of our lives",
      adoptionDate: new Date(),
      userSubmittedImage: catImage,
      userId: 2,
    },
    {
      content:
        "Thor is an amazing pet and I can not imagine life without him. One of the best decisions our family ever made",
      adoptionDate: new Date(),
      userSubmittedImage: catImage,
      userId: 3,
    },
    {
      content:
        "Chitzo fills our hearts with joy day in and day out. We are so thankful for him",
      adoptionDate: new Date(),
      userSubmittedImage: chitzoImage,
      userId: 4,
    },
  ];

  for (const storyData of stories) {
    await Story.create(storyData);
  }

  console.log("Seeding Appointments table...");
  const appointments = [
    {
      date: new Date(),
      petId: 5,
      userId: 3,
    },
    {
      date: new Date(),
      petId: 6,
      userId: 2,
    },
    {
      date: new Date(),
      petId: 7,
      userId: 1,
    },
    {
      date: new Date(),
      petId: 8,
      userId: 4,
    },
  ];

  for (const appointmentData of appointments) {
    await Appointment.create(appointmentData);
  }

  console.log("Database seeded successfully");

  // API CALLS TO PETFINDER API
  // Command to access
  // curl -d "grant_type=client_credentials&client_id=tbBuKXbo7oYUArbgXDWDDkNs6MFAlVHiSCW3UxFfjljlTAeccn&client_secret=JS3yr0FEPpRQyknFws39Bs9A0ytiG6Vvpa0EXPZG" https://api.petfinder.com/v2/oauth2/token

  const tokenInfo = await axios.post(
    "https://api.petfinder.com/v2/oauth2/token",
    {
      grant_type: "client_credentials",
      client_id: "tbBuKXbo7oYUArbgXDWDDkNs6MFAlVHiSCW3UxFfjljlTAeccn",
      client_secret: "JS3yr0FEPpRQyknFws39Bs9A0ytiG6Vvpa0EXPZG",
    }
  );

  console.log(tokenInfo.data.access_token);
  let access_token = tokenInfo.data.access_token;

  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const response = await axios
    .get(`https://api.petfinder.com/v2/animals`, config)
    .catch(console.log);

  const { animals } = response.data;




  for (const pet of animals) {


    console.log(pet);

    // If the pet has no large photo, set a stock image based on the species
    if (!pet.photos[0]?.large) {
      if (/cat/gi.test(pet.species)) replacementImage = catImage;
      else if (/dog/gi.test(pet.species)) replacementImage = dogImage;
    }

    let medicalHistory = "";
    medicalHistory += `${pet.name} is${
      pet.attributes.spayed_neutered ? " " : " not "
    }spayed-neutered.\n`;
    medicalHistory += `${pet.name} is ${
      pet.attributes.house_trained ? "" : "not"
    } house trained.\n`;
    medicalHistory += `${pet.name} is ${
      pet.attributes.declawed || null ? "" : "not"
    } declawed.\n`;
    medicalHistory += `${pet.name} does ${
      pet.attributes.special_needs || null ? "" : "not"
    } have special needs.\n`;
    medicalHistory += `${pet.name} is ${
      pet.attributes.shots_current || null ? "" : "not"
    } up to date on their shots.\n`;
    console.log(medicalHistory);

    let isAdoptable = true;
    if (pet.status !== "adoptable") isAdoptable = false;

    const geocodeRes = await axios.get(
      `https://geocode.maps.co/search?city=${pet.contact.address.city}&state=${pet.contact.address.state}`
    );

    console.log("Geocode Data:", geocodeRes.data[0])

    await Pet.create({
      name: pet.name,
      species: pet.species,
      breed: pet.breeds.primary,
      age: pet.age,
      gender: pet.gender,
      picture: pet.photos[0]?.large ?? replacementImage,
      state: pet.contact.address.state ?? null,
      zipCode: pet.contact.address.postcode ?? null,
      cityName: pet.contact.address.city ?? null,
      medicalHistory: medicalHistory,
      personality: pet.description,
      hasBeenAdopted: !isAdoptable,
      latitude: geocodeRes.data[0].lat,
      longitude: geocodeRes.data[0].lon,
    });



    await sleep(2000); 
  }

  console.log("Data has been seeded from PetFinder API successfully");
}

await seed().catch(console.error);

await db.close();
