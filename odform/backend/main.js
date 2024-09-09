const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { connection1, connection2 } = require("./sqlconnection");
const mainroute = require("./mainroute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", mainroute);

app.listen(4000, () => {
    console.log("Server started listening on port 4000");
});

module.exports = { express, app, bcrypt, connection1, connection2 };
