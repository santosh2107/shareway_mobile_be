const DriverRide = require('../models/driverRideModel');
const User = require('../models/userModel');

const addDriver_ride = async (req, res) => {
    try {
        const existUserId = await User.findOne({
            where: { id: req.body.driver_id },
        });
        if (existUserId) {
            const addDriverRide = await DriverRide.create({
                passenger_id: req.body.passenger_id,
                driver_id: req.body.driver_id,
                driver_name: existUserId.name,
                ride_status: req.body.ride_status,
                vehicleType: req.body.vehicleType,
                vehiclePlateNumber: req.body.vehiclePlateNumber
            })
            res.status(200).send({
                success: true,
                message: "Ride added successfully",
                data: addDriverRide,
            });
        } else {
            res.status(200).send({ success: false, message: `User does not exist!` });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}

const status_driverRide = async (req, res) => {
    try {
        const existdriverRideId = await DriverRide.findOne({
            where: { driverRide_Id: req.body.driverRide_Id }
        })
        if (existdriverRideId) {
            const changeStatus = await DriverRide.update({
                ride_status: req.body.ride_status
            })
            res.status(200).send({
                success: true,
                message: "Ride Status Change successfully",
                data: changeStatus,
            });
        } else {
            res.status(200).send({ success: false, message: `This Ride does not exist!` });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}

module.exports = {
    addDriver_ride,
    status_driverRide
}

