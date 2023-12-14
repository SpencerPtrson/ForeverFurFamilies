import { User } from "../database/models.js";

export const userHandlerFunctions = {
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        order: [["userId", "ASC"]],
      });
      res.json({ success: true, users });
    } catch (error) {
      console.log("Unable to get users.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(+userId);
      // console.log(user);
      res.json({ success: true, user });
    } catch (error) {
      console.log("Unable to get user by id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  createUser: async (req, res) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
      } = req.body;

      // console.log(
      //   `Creating user ${firstName} ${lastName} with email: ${email}, password: ${password}, phone: ${phoneNumber}, and profilePicURL: ${profilePicture}`
      // );
      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
      });

      // REPLACE WITH COOKIES
      req.session.userId = newUser.userId;
      req.session.email = newUser.email;
      req.session.firstName = newUser.firstName;
      req.session.lastName = newUser.lastName;
      req.session.phoneNumber = newUser.phoneNumber;
      req.session.profilePicture = newUser.profilePicture;
      req.session.isAdmin = false;

      res.json({ success: true, newUser });
    } catch (error) {
      console.log("Unable to create account");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  editUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
      } = req.body;

      const user = await User.findByPk(userId);
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      user.phoneNumber = phoneNumber;
      user.profilePicture = profilePicture;
      await user.save();

      res.json({ success: true, user });
    } catch (error) {
      console.log("Unable to edit account");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      // console.log(`Attempting to delete user with id: ${userId}`);
      const deletedUser = await User.destroy({
        where: { userId: userId },
      });
      res.json({ success: true, deletedUser });
    } catch (error) {
      console.log("Unable to delete user.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },
};
