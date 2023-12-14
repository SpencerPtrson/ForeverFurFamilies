import { Appointment, Pet, User } from "../database/models.js";
export const appointmentHandlerFunctions = {
  getAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.findAll({
        order: [["date", "DESC"]],
      });
      res.json({ success: true, appointments });
    } catch (error) {
      console.log("Unable to get appointments.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getAppointmentsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const appointments = await Appointment.findAll({
        where: { userId: userId },
        include: {
          model: Pet,
        },
      });
      res.json({ success: true, appointments });
    } catch (error) {
      console.log("Unable to get appointments.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getAppointmentById: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const appointment = await Appointment.findByPk(appointmentId);
      res.json({ success: true, appointment });
    } catch (error) {
      console.log("Unable to get appointment by id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  createAppointment: async (req, res) => {
    try {
      const { date, userId, petId } = req.body;
      // console.log(
      //   `Creating appointment for pet with id ${petId} with appointment date ${date} for user with userId ${userId}.`
      // );

      // Create new story
      const newAppointment = await Appointment.create({
        date,
      });

      // Find the appropriate pet to assign and assign them
      const pet = await Pet.findByPk(petId);
      await newAppointment.setPet(pet);

      // Find the appropriate user to assign to the appointment and assign them
      const user = await User.findByPk(userId);
      await newAppointment.setUser(user);

      res.json({ success: true, newAppointment });
    } catch (error) {
      console.log("Unable to create appointment");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  editAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { date, userId, petId } = req.body;

      // Edit appointment fields
      const appointment = await Appointment.findByPk(appointmentId);
      appointment.date = date;

      // set appointment's pet
      const pet = await Pet.findByPk(petId);
      await appointment.setPet(pet);

      // Set appointment's user (person setting up the appointment)
      const user = await User.findByPk(userId);
      await appointment.setUser(user);

      await appointment.save();

      res.json({ success: true, appointment });
    } catch (error) {
      console.log("Unable to edit appointment");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.body;
      // console.log(`Attempting to delete appointment with id: ${appointmentId}`);
      const deletedAppointment = await Appointment.destroy({
        where: { appointmentId: appointmentId },
      });
      res.json({ success: true, deletedAppointment });
    } catch (error) {
      console.log("Unable to delete appointment.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },
};
