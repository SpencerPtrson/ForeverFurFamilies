import { Link, useLoaderData } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function PetCards() {
//  const { pets } = useLoaderData();  // Will be added later
const pets = {
    petid: '1',
    image: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
    name: 'Fido',
    species: 'Dog',
    breed: 'Golden Retriever',
    cityname: 'Orem',
    state: 'Utah',
    gender: 'male',
    age: '3 months'
}

  const singlePetCard = pets.map(
    ({ petId, image, name, species, breed, cityname, state, gender, age }) => (
      <Card key={petId}>
        <Link to={`/pets/${petId}`}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Text>{name}</Card.Text>
            <Card.Text>
              {species}, {breed}
            </Card.Text>

            <Card.Text>
              {gender}, {age}
            </Card.Text>
            <Card.Text>
              {cityname}, {state}
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    )
  );

  return <>{singlePetCard}</>;
}
