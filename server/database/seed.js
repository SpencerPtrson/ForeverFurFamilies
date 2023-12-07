import { User, Pet, Story, Appointment, db } from './models.js'
import axios from 'axios';

async function seed() {
    console.log('Syncing database...');
    await db.sync({ force: true });

    console.log('Seeding Users table...');
    const users = [
        {
            email:'spencer@example.com',
            password: 'password',
            phoneNumber: '555-1234',
            firstName: 'Spencer',
            lastName: 'Peterson',
            profilePicture: 'profile1.jpg',
        }, {
            email:'wyatt@example.com',
            password: 'password',
            phoneNumber: '555-5678',
            firstName: 'Wyatt',
            lastName: 'Thayer',
            profilePicture: 'profile2.jpg'
        }, {
            email: 'justin@example.com',
            password: 'password',
            phoneNumber: '555-4321',
            firstName: 'Justin',
            lastName: 'Nelson',
            profilePicture: 'profile3.jpg'
        }, {
            email: 'tito@example.com',
            password: 'password',
            phoneNumber: '555-8765',
            firstName: 'Tito',
            lastName: 'Nanni',
            profilePicture: 'profile4.jpg'
        }
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
      picture: `picture1.jpg`,
      state: "UT",
      zipCode: '84117',
      cityName: "Millcreek",
      medicalHistory: "Fully vaccinated, neutered",
      personality: "Friendly and loves to play fetch",
      hasBeenAdopted: true,
    },
    {
      name: "Blue",
      species: "Cat",
      breed: "Siamese",
      age: 'Senior',
      gender: "Male",
      picture: `picture2.jpg`,
      state: "UT",
      zipCode: '84663',
      cityName: "Springville",
      medicalHistory: "Fully vaccinated",
      personality: "Timid and friendly",
      hasBeenAdopted: true,
    },
    {
      name: "Thor",
      species: "Cat",
      breed: "Orange",
      age: "Senior",
      gender: "Male",
      picture: `picture3.jpg`,
      state: "UT",
      zipCode: '84043',
      cityName: "Lehi",
      medicalHistory: "Fully vaccinated, has one eye",
      personality: "Very friendly and patient",
      hasBeenAdopted: true,
    },
    {
      name: "Chitzo",
      species: "Cat",
      breed: "Black",
      age: "Senior",
      gender: "Male",
      picture: `picture4.jpg`,
      state: "UT",
      zipCode: '84117',
      cityName: "Millcreek",
      medicalHistory: "Fully vaccinated, neutered",
      personality: "Friendly with humans and dogs",
      hasBeenAdopted: true,
    },
    {
      name: "Charlie",
      species: "Dog",
      breed: `Crocker Spaniel`,
      age: "Senior",
      gender: "Male",
      picture: "picture5.jpg",
      state: "UT",
      zipCode: '84093',
      cityName: "Sandy",
      medicalHistory: "Fully vaccinated",
      personality: "Trusting and loyal",
      hasBeenAdopted: false,
    },
    {
      name: "Bailey",
      species: "Dog",
      breed: "Boxer",
      age: "Senior",
      gender: "Female",
      picture: `picture6.jpg`,
      state: "UT",
      zipCode: '84047',
      cityName: "Midvale",
      medicalHistory: "Fully vaccinated, not spayed",
      personality: "Energetic and playful",
      hasBeenAdopted: false,
    },
    {
      name: "Daisy",
      species: "Dog",
      breed: "German Shepherd",
      age: "Senior",
      gender: "Female",
      picture: `picture7.jpg`,
      state: "UT",
      zipCode: '84009',
      cityName: "South Jordan",
      medicalHistory: "Fully vaccinated, spayed",
      personality: "Laidback and affectionate",
      hasBeenAdopted: false,
    },
    {
      name: "Max",
      species: "Dog",
      breed: "Bulldog",
      age: "Senior",
      gender: "Male",
      picture: `picture8.jpg`,
      state: "UT",
      zipCode: '84097',
      cityName: "Provo",
      medicalHistory: "Fully vaccinated",
      personality: "Independent and timid",
      hasBeenAdopted: false,
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
      userSubmittedImage: `bingo-happy.jpg`,
      userId: 4,
    },
    {
      content:
        "Blue has been the perfect addition to our family, we are so happy he is apart of our lives",
      adoptionDate: new Date(),
      userSubmittedImage: `blue-happy.jpg`,
      userId: 2,
    },
    {
      content:
        "Thor is an amazing pet and I can not imagine life without him. One of the best decisions our family ever made",
      adoptionDate: new Date(),
      userSubmittedImage: `thor-happy.jpg`,
      userId: 3,
    },
    {
      content:
        "Chitzo fills our hearts with joy day in and day out. We are so thankful for him",
      adoptionDate: new Date(),
      userSubmittedImage: `chitzo-happy.jpg`,
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
    }up to date on their shots.\n`;
    console.log(medicalHistory);

    let isAdoptable = true;
    if (pet.status !== "adoptable") isAdoptable = false;

    await Pet.create({
      name: pet.name,
      species: pet.species,
      breed: pet.breeds.primary,
      age: pet.age,
      gender: pet.gender,
      picture: pet.photos[0]?.large ?? null,
      state: pet.contact.address.city ?? null,
      zipCode: pet.contact.address.postcode ?? null,
      cityName: pet.contact.address.city ?? null,
      medicalHistory: medicalHistory,
      personality: pet.description,
      hasBeenAdopted: isAdoptable,
    });
  }

  console.log("Data has been seeded from PetFinder API successfully");
}

    await seed().catch(console.error)

    await db.close()