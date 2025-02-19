const Users = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const securePassword = async (password) => {
    try {
        const passwordHah = await bcryptjs.hash(password, 10)
        return passwordHah

    } catch (error) {
        throw new Error(error.message);
    }
}

const user_signUp = async (req, res) => {
    console.log('777777777777777');
    
    try {
        const { mobileNumber, email } = req.body;
        const existMobileNumber = await Users.findOne({ where: { mobileNumber } });
        if (existMobileNumber) {
            return res.status(200).send({ success: false, message: `User with this mobile number already exists!` });
        }

        const existEmail = await Users.findOne({ where: { email } });
        if (existEmail) {
            return res.status(200).send({ success: false, message: `User with this email already exists!` });
        }

        const sPassword = await securePassword(req.body.password);
        const user = await Users.create({
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            password: sPassword,
            address: req.body.address,
            vehicleType: req.body.vehicleType,
            vehiclePlateNumber: req.body.vehiclePlateNumber,
            roleId: req.body.type,
        });

        res.status(200).send({ success: true, data: user, message: "Registration successful" });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};

// const user_signUp = async (req, res) => {
//     try {
//         const sPassword = await securePassword(req.body.password)
//         const existMobileNumber = await Users.findOne({ where: { mobileNumber: req.body.mobileNumber } });
//         if (existMobileNumber) {
//             res.status(200).send({ success: false, message: `This User already exists!` });
//         } else {
//             const user = await Users.create({
//                 name: req.body.name,
//                 mobileNumber: req.body.mobileNumber,
//                 email: req.body.email,
//                 password: sPassword,
//                 address: req.body.address,
//                 vehicleType: req.body.vehicleType,
//                 vehiclePlateNumber: req.body.vehiclePlateNumber,
//                 type: req.body.type,
//             })
//             res.status(200).send({ success: true, data: user, message: "Registration successfull" })
//         }
//     } catch (error) {
//         res.status(400).send({ success: false, message: error.message });
//     }
// }

const create_token = async (id) => {
    try {
        const token = await jwt.sign({ tokenData: id }, process.env.SECRET_JWT, {
            expiresIn: "24h"
        });
        return token;
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const user_login = async (req, res) => {
    try {

        const userData = await Users.findOne({ where: { email: req.body.email } });
        if (userData) {
            const passwordMatch = await bcryptjs.compare(req.body.password, userData.password);
            if (passwordMatch) {
                const tokenData = await create_token({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                })
                const useResult = {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    mobileNumber: userData.mobileNumber,
                    address: userData.address,
                    roleId: userData.type,
                    token: tokenData,
                };
                res.status(200).send({ success: true, message: "Login Successfully", data: useResult });
            } else {
                res.status(200).send({ success: false, message: `Login details are incorrect` });
            }
        } else {
            res.status(200).send({ success: false, message: `Login details are incorrect` });
        }

    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}

module.exports = {
    user_signUp,
    user_login
}