const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection/database")

const Users = sequelize.define(
    "users",
    {
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        roleType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // address: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // vehicleType: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        // vehiclePlateNumber: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },

        // otp: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // otpExpiry: {
        //     type: DataTypes.DATE,
        //     allowNull: true,
        // },
        // isVerified: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        // },
    },
    {
        freezeTableName: true,
        hooks: {
            beforeValidate: async (user, options) => {
                if (!user.id) {
                    const nanoid = (await import("nanoid")).nanoid;
                    user.id = nanoid(20);
                }
            }
        }
    }
)

module.exports = Users;