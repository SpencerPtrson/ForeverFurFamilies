import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import bcryptjs from "bcryptjs";

export const db = await connectToDB("postgresql:///foreverfurfamilies");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  },
  {
    hooks: {
      beforeUpdate: async (user, options) => {
        if (user.password) {
          const hashedPassword = await bcryptjs.hash(user.password, 12);
          user.password = hashedPassword;
        }
      },
      beforeCreate: async (user, options) => {
        const hashedPassword = await bcryptjs.hash(user.password, 12);
        user.password = hashedPassword;
      },
      beforeBulkCreate: async (users, options) => {
        for (let user of users) {
          const hashedPassword = await bcryptjs.hash(user.password, 12);
          user.password = hashedPassword;
        }
      },
      beforeBulkUpdate: async (users, options) => {
        for (let user of users) {
          if (user.password) {
            const hashedPassword = await bcryptjs.hash(user.password, 12);
            user.password = hashedPassword;
          }
        }
      },
    },
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
      order: [["userId", "DESC"]],
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ["password"],
        },
      },
    },
    modelName: "user",
    sequelize: db,
  }
);

export class Pet extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Pet.init(
  {
    petId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    picture: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    cityName: DataTypes.STRING,
    medicalHistory: DataTypes.TEXT,
    personality: DataTypes.TEXT,
    hasBeenAdopted: DataTypes.BOOLEAN,
  },
  {
    modelName: "pet",
    sequelize: db,
  }
);

export class Story extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Story.init(
  {
    storyId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: DataTypes.TEXT,
    adoptionDate: DataTypes.DATE,
    userSubmittedImage: DataTypes.STRING,
    // userId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: User,
    //         key: 'userId'
    //     }
    // }
  },
  {
    modelName: "story",
    sequelize: db,
  }
);

export class Appointment extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Appointment.init(
  {
    appointmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: DataTypes.DATE,
    // petId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Pet,
    //         key: 'petId'
    //     },
    // },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: User,
    //         key: 'userId'
    //     },
    // },
  },
  {
    modelName: "appointment",
    sequelize: db,
  }
);

User.hasMany(Pet, { foreignKey: "userId" });
Pet.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Story, { foreignKey: "userId" });
Story.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Appointment, { foreignKey: "userId" });
Appointment.belongsTo(User, { foreignKey: "userId" });

Pet.hasOne(Story);
Story.belongsTo(Pet);

Pet.hasMany(Appointment, { foreignKey: "petId" });
Appointment.belongsTo(Pet, { foreignKey: "petId" });
