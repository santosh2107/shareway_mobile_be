const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection/database");

const Ride = sequelize.define(
    "passenger-ride",
    {
        passengerRide_Id: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        passenger_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passenger_name: {
            type: DataTypes.STRING,
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
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        hooks: {
            beforeValidate: async (ride, options) => {
                if (!ride.passengerRide_Id) {
                    const nanoid = (await import("nanoid")).nanoid;
                    ride.passengerRide_Id = nanoid(20);
                }
            }
        }
    }
);

module.exports = Ride;
