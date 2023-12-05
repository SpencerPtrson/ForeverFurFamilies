import { DataTypes, Model } from "sequelize";
import util from 'util';
import connectToDB from "./db";

export const db = await connectToDB('postgresql:///foreverfurfamilies');

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
          order: [["id", "DESC"]],
        },
        scopes: {
          withPassword: {
            attributes: {
              include: ["password"],
            },
          },
        },
        modelName: 'user',
        sequelize: db,
    },
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
        species:DataTypes.STRING,
        breed:DataTypes.STRING,
        age: DataTypes.INTEGER,
        state: DataTypes.STRING,
        zipCode: DataTypes.INTEGER,
        cityName: DataTypes.STRING,
        medicalHistory:DataTypes.TEXT,
        personality: DataTypes.TEXT,
        hasBeenAdopted:DataTypes.BOOLEAN,
    },
    {
        modelName: 'pet',
        sequelize: db,
    },
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
        // userId if stories are user-specific?
    },
    {
        modelName: 'story',
        sequelize: db,
    },
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
        // add other fields maybe? like location?
    },
    {
        modelName: 'appointment',
        sequelize: db,
    },
);

User.hasMany(Pet);
Pet.belongsTo(User);

User.hasMany(Story);
Story.belongsTo(User);

User.hasMany(Appointment);
Appointment.belongsTo(User);

Pet.hasOne(Story);
Story.belongsTo(Pet);

