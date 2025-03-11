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










// const express = require('express');
// const app = express();
// require('dotenv').config();
// const { sequelize } = require("./dbConnection/database");
// const bodyParser = require("body-parser");
// const cors = require('cors');
// const user_routes = require("./routes/userRoute");
// const passengerRide_routes = require("./routes/passangerRideRoute");
// const driverRide_routes = require("./routes/driverRideRoute");

// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));


// app.use(cors());


// app.use("/shareway", user_routes);
// app.use("/shareway", passengerRide_routes);
// app.use("/shareway", driverRide_routes);

// const PORT = process.env.PORT || 5000;

// sequelize.sync()
//     .then(() => {
//         app.listen(PORT, '0.0.0.0', () => {
//             console.log(`Shareway Server is running on http://ipconfig:${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error("Error connecting to the database:", err);
//     });




    const express = require('express');
    const app = express();
    require('dotenv').config();
    const { sequelize } = require("./dbConnection/database");
    const bodyParser = require("body-parser");
    const cors = require('cors');
    const user_routes = require("./routes/userRoute");
    const passengerRide_routes = require("./routes/passangerRideRoute");
    const driverRide_routes = require("./routes/driverRideRoute");
    
    // Middleware to parse JSON bodies
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(cors());
    // const corsOptions = {
    //     origin: '*', // Allow all origins (you can specify specific origins if needed)
    //     methods: 'GET,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    //     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    //     optionsSuccessStatus: 204 // Set the status code for successful OPTIONS requests
    // };
    
    // // Use CORS middleware with the specified options
    // app.use(cors(corsOptions));
    
    // Routes
    app.use("/shareway", user_routes);
    app.use("/shareway", passengerRide_routes);
    app.use("/shareway", driverRide_routes);
    
    const PORT = process.env.PORT || 8080;
    
    // Sync database and start the server
    sequelize.sync()
        .then(() => {
            app.listen(PORT, '0.0.0.0', () => {
                console.log(`Shareway Server is running on http://ipconfig:${PORT}`);
            });
        })
        .catch((err) => {
            console.error("Error connecting to the database:", err);
        });