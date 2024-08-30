const mysql=require("mysql");
const express=require("express");
const app=express()
const connection1 = mysql.createConnection({
    host: process.env.DB1_HOST||"localhost",
    user: process.env.DB1_USER||"root",
    password: process.env.DB1_PASSWORD||"Sabari.m6369",
    database: process.env.DB1_DATABASE||"teacher",
  });
  const connection2 = mysql.createConnection({
    host: process.env.DB1_HOST||"localhost",
    user: process.env.DB1_USER||"root",
    password: process.env.DB1_PASSWORD||"Sabari.m6369",
    database: process.env.DB1_DATABASE||"student",
  });
 
connection1.connect((err) => {
    if (err) {
      console.error("Error occurred in connection1:", err.message);
    } else {
      console.log("SQL connection success in teacher database");
    }
  });
connection2.connect((err) => {
    if (err) {
      console.error("Error occurred in connection2:", err.message);
    } else {
      console.log("SQL connection success in student database");
    }
  });
  module.exports={connection1,connection2};