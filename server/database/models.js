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
    },
    {
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
        petId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
        petId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        modelName: 'appointment',
        sequelize: db,
    },
);