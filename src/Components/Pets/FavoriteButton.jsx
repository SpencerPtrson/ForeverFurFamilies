import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

export const FavoriteButton = ({ petId }) => {
  const [checked, setChecked] = useState(false);
  const userId = useSelector((state) => state.userId);
  const [favoritePetId, setFavoritePetId] = useState();

  console.log("Current Favorite Pet Id:", favoritePetId);


  const handleFavorite = async (e) => {
    try {
      const response = await axios.post("/api/favoritePets/create", {
        userId: userId,
        petId: petId,
      });
      console.log(response.data);
      setFavoritePetId(response.data.newFavoritePetInstance.favoritePetId);
      setChecked(true);
    } catch (error) {
      console.log("error setting favorite", error);
    }
  };

  const unFavorite = async (e) => {
    try {
      const response = await axios.delete(`/api/favoritePets/delete/${favoritePetId}`, {
        userId,
        petId,
      });
      setChecked(false);
    } catch (error) {
      console.log("error unFavorite", error);
    }
  };

  const determineInitialCheckState = async (e) => {
    // Check if userId + petId combination is in database to determine if checked should be initially true
    if (userId) {
      const response = await axios.get(`/api/favoritePets/users/${userId}`);
      for (const pet of response.data.favoritePets) {
        // if user has a favoritePet with matching petId, 
        if (pet.petId === petId) {
          setFavoritePetId(pet.favoritePetId);
          setChecked(true);
        }
      }
    } 
  }

  useEffect( () => {
    determineInitialCheckState();
  }, []);

  return (
    <>
      {checked ? (
        <FontAwesomeIcon
          icon={fasHeart}
          size="xl"
          style={{ color: "#1010c2", cursor: "pointer" }}
          onClick={unFavorite}
        />
      ) : (
        <FontAwesomeIcon
          icon={farHeart}
          size="xl"
          style={{ color: "#1010c2", cursor: "pointer" }}
          onClick={handleFavorite}
        />
      )}
    </>
  );
};
