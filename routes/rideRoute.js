const express = require("express");
const ride_route = express.Router();
const { add_ride, get_ride, update_ride } = require("../controllers/rideController");

ride_route.post("/add-ride", add_ride);
ride_route.get("/get-ride", get_ride);
ride_route.put("/update-ride", update_ride);

module.exports = ride_route;