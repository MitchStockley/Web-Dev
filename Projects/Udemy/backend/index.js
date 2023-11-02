const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");


app.use(cors());
// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log('App is listening');
        });
    })
    .catch((error) => {
        console.log(error);
    });



const PORT = process.env.PORT || 5000;