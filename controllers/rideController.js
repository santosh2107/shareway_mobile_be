const Ride = require('../models/rideModel');
const User = require('../models/userModel');

const add_ride = async (req, res) => {
    try {

        const existUserId = await User.findOne({
            where: { id: req.body.user_Id },
        });
        if (existUserId) {
            const ride = await Ride.create({
                user_Id: req.body.user_Id,
                pickup_location: req.body.pickup_location,
                dropoff_location: req.body.dropoff_location,
                ride_rent: req.body.ride_rent,
                booked_time: req.body.booked_time,
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

const get_ride = async (req, res) => {
    try {
        const rideData = await Ride.findAll();
        res.status(200).send({
            success: true,
            message: "All Ride",
            data: rideData,
        });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}

const update_ride = async (req, res) => {
    try {

        const singleRide = await Ride.findOne({
            where: { ride_Id: req.body.ride_Id },
        });

        if (singleRide) {
            await Ride.update(
                {
                    pickup_location: req.body.pickup_location,
                    dropoff_location: req.body.dropoff_location,
                    ride_rent: req.body.ride_rent,
                    booked_time: req.body.booked_time,
                },
                { where: { ride_Id: req.body.ride_Id } }
            );
            const updatedRide = await Ride.findOne({ where: { ride_Id: req.body.ride_Id }, });
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
    add_ride,
    get_ride,
    update_ride
}