import { Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
    <div>
      {checked ? (
        <Button
          style={{ backgroundColor: "green" }}
          onClick={(e) => unFavorite()}
        >
          Liked
        </Button>
      ) : (
        <Button onClick={(e) => handleFavorite()}>Currently not liked </Button>
      )}
    </div>
  );
};
