import { Link, useLoaderData } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function PetCards({pet}) {
  //  const { pets } = useLoaderData();  // Will be added later

  const { petId, picture, name, species, breed, cityname, state, gender, age } = pet;
  let locationString = '';
  if (state) locationString += state;
  if (state && cityname) locationString += ', ';
  if (cityname) locationString += cityname;


  console.log(state);
console.log(picture)
  return (
    <Card key={petId}>
      <Link to={`/pets/${petId}`}>
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

