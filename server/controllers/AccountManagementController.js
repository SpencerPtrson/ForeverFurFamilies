import { User } from "../database/models.js";
import bcryptjs from "bcryptjs";

const accountManagementHandlerFunctions = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // console.log("Attempting Login");
      const user = await User.scope("withPassword").findOne({
        where: { email },
      });
      // console.log(user);

      if (!user) {
        console.log("User not found");
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      const isMatch = bcryptjs.compareSync(password, user.password);
      // console.log("password value:", password);
      // console.log("user password value:", user.password);
      // console.log("is match value:");
      // console.log(isMatch);

      if (!isMatch) {
        console.log("Incorrect Password");
        return res
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      }

      // REPLACE WITH COOKIES EVENTUALLY
      req.session.userId = user.userId;
      req.session.email = user.email;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.phoneNumber = user.phoneNumber;
      req.session.profilePicture = user.profilePicture;
      req.session.isAdmin = user.isAdmin;

      res.json({
        success: true,
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        profilePicture: user.profilePicture,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("Internal server error");
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.json({ success: true });
  },

  userCheck: async (req, res) => {
    try {
      // console.log("User Check called!");
      if (req.session.userId) {
        // console.log("Session userId is valid.");
        const user = await User.findByPk(req.session.userId);
        // console.log("Found User: ", user);

        res.send({
          success: true,
          userId: user?.userId ?? null,
          email: user?.email ?? null,
          firstName: user?.firstName ?? null,
          isAdmin: user?.isAdmin ?? false,
          isAuth: true,
        });
      } else {
        // console.log("No session.userId available.");
        res.send({
          success: false,
          userId: null,
          email: null,
          firstName: null,
          isAdmin: false,
          isAuth: false,
        });
      }
    } catch (error) {
      console.log("User check failed");
      console.log("Error:", error);
    }
  },

  appointmentCheck: async (req, res) => {
    const { userId, password, firstName, lastName, phoneNumber, email } =
      req.body;
    console.log("this is a check", userId);

    try {
      const user = await User.scope("withPassword").findOne({
        where: { userId },
      });
      // console.log(user);

      if (!user) {
        console.log("User not found");
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      const isMatch = bcryptjs.compareSync(password, user.password);

      if (!isMatch) {
        console.log("Incorrect Password");
        return res
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      }

      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      user.phoneNumber = phoneNumber;
      await user.save();

      req.session.userId = user.userId;
      req.session.email = user.email;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.phoneNumber = user.phoneNumber;

      res.json({
        success: true,
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
    } catch (error) {
      console.error("check and update error:", error);
      res.status(500).send("Internal server error");
    }
  },
};

export default accountManagementHandlerFunctions;
