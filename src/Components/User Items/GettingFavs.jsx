import axios from "axios";
import { useSelector } from "react-redux";
import PetCards from "../Pets/PetCards";
import { useState } from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../Pets/FavoriteButton";

const FavPets = () => {
  const [favList, setFavList] = useState([]);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const getFavPets = async () => {
      try {
        const response = await axios.get(`/api/favoritePets/users/${userId}`);

        const getPromises = response.data.favoritePets.map(async(pets) =>{
            const res = await axios.get(`/api/pets/${pets.petId}`)
            console.log(res.data.pet)
            return res.data.pet
        })
        const allPets = await Promise.all(getPromises)
        console.log(allPets)
        setFavList(allPets)
        // console.log(response.data.favoritePets);
      } catch (error) {
        console.error("error finding pet", error);
      }
    };
    getFavPets();
  }, []);

  const petCards = favList.map((pet) => (
    <Card key={pet.petId}>
      
    <div className="cardtop">
    <Link to={`/SpecificPet/${pet.petId}`}>
        <Card.Img variant="top" src={pet.picture} />
        </Link>
        {userId !== "" && ( <div className="heart-icon-wrapper">
    <div className="heart-icon"><FavoriteButton petId={pet.petId} /> </div></div>)}
      </div>
      
    <Card.Body>
      <Link to={`/SpecificPet/${pet.petId}`}>
        <Card.Title>{pet.name}</Card.Title>
        <Card.Text>
          {pet.species}, {pet.breed}
        </Card.Text>

        <Card.Text>
          {pet.gender}, {pet.age}
        </Card.Text>
        <Card.Text>{pet.locationString}</Card.Text>
      </Link>
      
    </Card.Body>
  </Card>
  ));

  return <div>{petCards}</div>;
};

export default FavPets;
