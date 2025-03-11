const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection/database");

const Ride = sequelize.define(
    "driver-ride",
    {
        driverRide_Id: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        passenger_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        driver_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        driver_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ride_status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vehiclePlateNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        freezeTableName: true,
        hooks: {
            beforeValidate: async (ride, options) => {
                if (!ride.driverRide_Id) {
                    const nanoid = (await import("nanoid")).nanoid;
                    ride.driverRide_Id = nanoid(20);
                }
            }
        }
    }
);

module.exports = Ride;
