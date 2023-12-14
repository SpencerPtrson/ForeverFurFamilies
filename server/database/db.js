import { Sequelize } from "sequelize";

async function connectToDB(dbURI) {
  console.log(`Connecting to DB: ${dbURI}`);

  const sequelize = new Sequelize(dbURI, {
    logging: console.log, // set logging: false to disable outputting SQL queries to console
    dialect:'postgres',
    define: {
      timestamps: false,
      underscored: true,
    },
    dialectOptions: {
      useUTC: false, // for reading from database,
    },
    timezone: '-07:00'
  });

  try {
    await sequelize.authenticate();
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }

  return sequelize;
}

export default connectToDB;
