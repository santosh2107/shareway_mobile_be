const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection/database");

const Ride = sequelize.define(
    "Ride", // Change "rides" to "Ride" (Singular and PascalCase)
    {
        user_Id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ride_Id: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        pickup_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dropoff_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ride_rent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        booked_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        hooks: {
            beforeValidate: async (ride, options) => {
                if (!ride.ride_Id) {
                    const nanoid = (await import("nanoid")).nanoid;
                    ride.ride_Id = nanoid(20);
                }
            }
        }
    }
);

module.exports = Ride;
