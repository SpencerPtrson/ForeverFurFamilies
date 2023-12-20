import { Link, useLoaderData } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FavoriteButton } from "./FavoriteButton";
import { useSelector } from "react-redux";
import "./PetCards.css";

export default function PetCards({ pet, customClass }) {
  const userId = useSelector((state) => state.userId);

  const cardClassName = customClass ? `card ${customClass}` : "card";
  const { petId, picture, name, species, breed, cityName, state, gender, age } =
    pet;
  let locationString = "";
  if (cityName) locationString += cityName;
  if (state && cityName) locationString += ", ";
  if (state) locationString += state;
  return (

    <Card key={petId} className={cardClassName}>
      
      <div className="cardtop">
        <Link to={`/SpecificPet/${petId}`}>
          <Card.Img variant="top" src={picture} />
        </Link>
        {userId !== "" && (
          <div className="heart-icon-wrapper">
            <div className="heart-icon">
              <FavoriteButton petId={petId} />{" "}
            </div>
          </div>
        )}
      </div>

      <Card.Body>
        <Link to={`/SpecificPet/${petId}`}>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {species}, {breed}
          </Card.Text>

          <Card.Text>
            {gender}, {age}
          </Card.Text>
          <Card.Text>{locationString}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}
