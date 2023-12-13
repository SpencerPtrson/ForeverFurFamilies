import { Link, useLoaderData } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FavoriteButton } from "./FavoriteButton";
import { useSelector } from "react-redux";

export default function PetCards({ pet }) {
  const userId = useSelector((state) => state.userId);

  const { petId, picture, name, species, breed, cityName, state, gender, age } =
    pet;
  let locationString = "";
  if (cityName) locationString += cityName;
  if (state && cityName) locationString += ", ";
  if (state) locationString += state;
  return (
    <Card key={petId} style={{ backgroundColor: "lightblue" }}>
      <Link to={`/SpecificPet/${petId}`}>
        <div style={{maxHeight:'250px',overflow:'hidden'}}>
        <Card.Img variant="top" src={picture} style={{maxHeight:'100%'}}/>
        </div>
      </Link>
      <Card.Body>
        <Link to={`/SpecificPet/${petId}`}>
          <Card.Text>{name}</Card.Text>
          <Card.Text>
            {species}, {breed}
          </Card.Text>

          <Card.Text>
            {gender}, {age}
          </Card.Text>
          <Card.Text>{locationString}</Card.Text>
        </Link>
        {userId !== "" && <FavoriteButton petId={petId} />}
      </Card.Body>
    </Card>
  );
}
