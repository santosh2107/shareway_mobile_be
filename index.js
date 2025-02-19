// const express = require('express');
// const app = express();
// require('dotenv').config();
// const { sequelize } = require("./dbConnection/database")
// const bodyParser = require("body-parser");
// const cors = require('cors');
// const user_routes = require("./routes/userRoute")


// app.use(bodyParser.json());
// // app.use(cors());
// app.use(
//     cors({
//         origin: "*", // Allow all origins (Replace '*' with specific domain in production)
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );


// app.use("/shareway", user_routes);


// const PORT = process.env.POST || 8081

// sequelize.sync().then(() => {
//     app.listen(PORT, '0.0.0.0', () => {
//         console.log(`Shareway Server is running on http://localhost:${PORT}`)
//     })
// }).catch((error) => {
//     console.log("Error: " + err);
// })





const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require("./dbConnection/database");
const bodyParser = require("body-parser");
const cors = require('cors');
const user_routes = require("./routes/userRoute");
const ride_routes = require("./routes/rideRoute");

// Use bodyParser for parsing incoming requests
app.use(bodyParser.json());

// Enable CORS with specific configurations
app.use(
    cors({
        origin: "*", // Allow all origins (Replace '*' with specific domain in production)
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Define route for the user-related API
app.use("/shareway", user_routes);
app.use("/shareway", ride_routes);

// Use `PORT` environment variable or fallback to 8081
const PORT = process.env.PORT || 8080;

sequelize.sync()
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Shareway Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });
