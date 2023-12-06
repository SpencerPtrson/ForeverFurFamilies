import { Col, Container, Row } from "react-bootstrap";
import PetCards from "../Pets/PetCards";
import "./homepage.css";

const HomePage = () => {
    const pets = [{
        petId: '1',
        image: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
        name: 'Fido',
        species: 'Dog',
        breed: 'Golden Retriever',
        cityname: 'Orem',
        state: 'Utah',
        gender: 'non',
        age: '3 months'
    },{
      petId: '2',
      image: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      name: 'apple',
      species: 'Dog',
      breed: 'Golden Retriever',
      cityname: 'Orem',
      state: 'Utah',
      gender: 'male',
      age: '3 months'
    },{
      petId: '3',
      image: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      name: 'other',
      species: 'Dog',
      breed: 'Golden Retriever',
      cityname: 'Orem',
      state: 'Utah',
      gender: 'female',
      age: '3 months'
    },{
        petId: '3',
        image: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
        name: 'that',
        species: 'Dog',
        breed: 'Golden Retriever',
        cityname: 'Orem',
        state: 'Utah',
        gender: 'female',
        age: '3 months'
      },{
        petId: '3',
        image: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
        name: 'cow',
        species: 'Dog',
        breed: 'Golden Retriever',
        cityname: 'Orem',
        state: 'Utah',
        gender: 'female',
        age: '3 months'
      }]

  const petCards = pets.map((pet) => {
    return <PetCards pet={pet} key={pet.petId}/>;
  });

  return (
    <Container>
      <section className="carousel">
        <ol className="carousel_viewport">
          {petCards.map((card, index) => (
              <li key={index} className="carousel_slide">
                <div className="carousel_snapper">
                  {card}
                </div>
              </li>
          ))}
        </ol>
      </section>
    </Container>
  );
};

export default HomePage;
