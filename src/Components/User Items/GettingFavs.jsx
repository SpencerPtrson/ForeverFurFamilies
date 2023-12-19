import axios from "axios";
import { useSelector } from "react-redux";
import PetCards from "../Pets/PetCards";

const favPets = () => {
  const [favList, setFavList] = useState([]);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const getFavPets = async () => {
      try {
        const response = await axios.get(`/api/favoritePets/users/${userId}`);
        setFavList(response.data.pets)
        // console.log(response.data.pets);
      } catch (error) {
        console.error("error finding pet", error);
      }
    };
    getFavPets();
  }, []);

  const petCards = favList.map((pet) => {
    return <PetCards pet={pet} key={pet.petId} />;
  });

  return <div>{petCards}</div>;
};

export default favPets;
