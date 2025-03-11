const express = require("express");
const driverRide_route = express.Router();
const { addDriver_ride, status_driverRide } = require('../controllers/driverRideController');

driverRide_route.post("/add-driverRide", addDriver_ride);
driverRide_route.put("/updateStatus-driverRide", status_driverRide);

module.exports = driverRide_route;