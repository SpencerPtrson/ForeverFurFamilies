import { User, Pet, Story, Appointment, db } from "./models.js";

const users = await User.findAll();

console.log(users);
await db.close();
