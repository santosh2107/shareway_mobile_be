const Sequelize = require("sequelize").Sequelize;
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL || {
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("database Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = { dbConnection, sequelize }

