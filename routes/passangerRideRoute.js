const express = require("express");
const passengerRide_route = express.Router();
const { add_passengerRide, get_passengerRide, update_passengerRide } = require("../controllers/passangerRideController");

passengerRide_route.post("/add-passengerRide", add_passengerRide);
passengerRide_route.get("/get-passengerRide", get_passengerRide);
passengerRide_route.put("/update-passengerRide", update_passengerRide);

module.exports = passengerRide_route;