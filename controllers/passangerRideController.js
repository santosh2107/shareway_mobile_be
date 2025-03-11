const PassangerRide = require('../models/passangerRideModel');
const User = require('../models/userModel');

const add_passengerRide = async (req, res) => {
    try {
        const existUserId = await User.findOne({
            where: { id: req.body.passenger_id },
        });
        if (existUserId) {
            const ride = await PassangerRide.create({
                passenger_id: req.body.passenger_id,
                passenger_name: existUserId.name,
                pickup_location: req.body.pickup_location,
                dropoff_location: req.body.dropoff_location,
                ride_rent: req.body.ride_rent,
                booked_time: req.body.booked_time,
                status: 'pending'
            })
            res.status(200).send({
                success: true,
                message: "Ride added successfully",
                data: ride,
            });
        } else {
            res.status(200).send({ success: false, message: `User does not exist!` });
        }

    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}

const get_passengerRide = async (req, res) => {
    try {
        const rideData = await PassangerRide.findAll();
        res.status(200).send({
            success: true,
            message: "All Ride",
            data: rideData,
        });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}

const update_passengerRide = async (req, res) => {
    try {
        const singleRide = await PassangerRide.findOne({
            where: { ride_Id: req.body.ride_Id },
        });

        if (singleRide) {
            await PassangerRide.update(
                {
                    pickup_location: req.body.pickup_location,
                    dropoff_location: req.body.dropoff_location,
                    ride_rent: req.body.ride_rent,
                    booked_time: req.body.booked_time,
                },
                { where: { ride_Id: req.body.ride_Id } }
            );
            const updatedRide = await PassangerRide.findOne({ where: { ride_Id: req.body.ride_Id }, });
            res.status(200).send({
                success: true,
                message: "Ride updated successfully",
                data: updatedRide,
            });

        } else {
            res.status(404).send({
                success: false,
                message: "Ride not found",
            });
        }

    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}



module.exports = {
    add_passengerRide,
    get_passengerRide,
    update_passengerRide
}