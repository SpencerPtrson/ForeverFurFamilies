import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

export const FavoriteButton = ({ petId }) => {
  const [checked, setChecked] = useState(false);
  const userId = useSelector((state) => state.userId);
  const handleFavorite = async (e) => {
    try {
      const response = await axios.post("/api/favoritePets/create", {
        userId: userId,
        petId: petId,
      });
      setChecked(true);
    } catch (error) {
      console.log("error setting favorite", error);
    }
  };

  const unFavorite = async (e) => {
    try {
      const response = await axios.delete(`/api/favoritePets/delete/${petId}`, {
        userId,
        petId,
      });
      setChecked(false);
    } catch (error) {
      console.log("error unFavorite", error);
    }
  };

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
