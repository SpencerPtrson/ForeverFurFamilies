import { FavoritePet, User, Pet } from "../database/models.js";
export const favoritePetHandlerFunctions = {
  getAllFavoritePets: async (req, res) => {
    try {
      const favoritePets = await FavoritePet.findAll({
        order: [["petId", "ASC"]],
      });
      res.json({ success: true, favoritePets });
    } catch (error) {
      console.log("Unable to get favorited pets.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getFavoritePetsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      let favoritePets = await FavoritePet.findAll({
        where: { userId: userId },
      });
      res.json({ success: true, favoritePets });
    } catch (error) {
      console.log("Unable to get favorited pets by user Id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getUsersByFavoritePetId: async (req, res) => {
    try {
      const { petId } = req.params;
      // Get all instances of a pet being favorited
      const instancesOfFavoritePet = await FavoritePet.findAll({
        where: { petId: petId },
      });

      // iterate through instancesOfFavoritePet and save users to a list
      const userArr = [];
      for (const petInstance of instancesOfFavoritePet) {
        userArr.push(await User.findByPk(petInstance.userId));
      }

      res.json({ success: true, userArr });
    } catch (error) {
      console.log("Unable to get users by favorite pet id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  createFavoritePet: async (req, res) => {
    try {
      const { userId, petId } = req.body;
      // console.log(userId);
      // console.log("Pet Id:", petId);
      const user = await User.findByPk(userId);
      const pet = await Pet.findByPk(petId);

      const newFavoritePetInstance = await FavoritePet.create();
      newFavoritePetInstance.setUser(user);
      newFavoritePetInstance.setPet(pet);

      res.json({ success: true, newFavoritePetInstance });
    } catch (error) {
      console.log("Unable to create favorite pet instance.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  deleteFavoritePet: async (req, res) => {
    try {
      const { favoritePetId } = req.params;
      // console.log(
      //   `Attempting to delete favorite pet instance with favoritePetId: ${favoritePetId}`
      // );
      const deletedFavoritePet = await FavoritePet.destroy({
        where: { favoritePetId: favoritePetId },
      });

      res.json({ success: true, deletedFavoritePet });
    } catch (error) {
      console.log("Unable to delete favorited pet.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },
};
