import { Link, useLoaderData } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function PetCards({pet}) {
  //  const { pets } = useLoaderData();  // Will be added later

  const { petId, image, name, species, breed, cityname, state, gender, age } = pet;

  return (
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
  );
}
