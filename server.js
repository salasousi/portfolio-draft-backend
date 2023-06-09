
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import models
const Projects = require('./models/projects');
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));


///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(express.urlencoded({ extended: true })); //access to req.body

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

// PROJECT INDEX ROUTE
app.get("/projects", async (req, res) => {
    try {
        // send all projects
        res.json(await Projects.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
        console.log('error: ', error);
    }
});

// PROJECT CREATE ROUTE
app.post("/projects", async (req, res) => {
    try {
        // send all projects
        res.json(await Projects.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
        console.log('error: ', error);
    }
});

// PROJECT UPDATE ROUTE
app.put("/projects/:id", async (req, res) => {
    try{
         res.json(await Projects.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ));
    } catch (error) {
         //send error
         res.status(400).json(error);
         console.log('error: ', error);
    }
});

// PROJECT DELETE ROUTE
// app.delete("/projects/:id", async (req, res) => {
//     try{
//          res.json(await Projects.findByIdAndDelete(req.params.id));
//     } catch (error) {
//          //send error
//          res.status(400).json(error);
//          console.log('error: ', error);
//     }
// });



///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));