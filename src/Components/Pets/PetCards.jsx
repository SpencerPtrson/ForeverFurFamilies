import { Link, useLoaderData } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function PetCards({pet}) {

  const { petId, picture, name, species, breed, cityName, state, gender, age } = pet;
  let locationString = '';
  if (cityName) locationString += cityName;
  if (state && cityName) locationString += ', ';
  if (state) locationString += state;

  return (
    <Card key={petId} style={{ backgroundColor: 'lightblue'}}>
      <Link to={`/SpecificPet/${petId}`}>
        <Card.Img variant="top" src={picture} />
        <Card.Body>
          <Card.Text>{name}</Card.Text>
          <Card.Text>
            {species}, {breed}
          </Card.Text>

          <Card.Text>
            {gender}, {age}
          </Card.Text>
          <Card.Text>
            {locationString}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

