const express = require("express");
const bcrypt = require("bcrypt");
const { connection1, connection2 } = require("../sqlconnection");
const studentsignup = express.Router();

studentsignup.post("/studentsignup", async (req, res) => {
  const { username, email, password, classhandling, section, year, rollno } = req.body;
  
  try {
    const checkEmailQuery = "SELECT email FROM signupdetails WHERE email = ?";
    
    connection1.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error("Error checking email in connection1:", err.message);
        return res.status(500).json({ success: false, msg: "Server error" });
      }
      if (results.length > 0) {
        return res.status(400).json({ success: false, msg: "Email already in use" });
      }
      
      connection2.query(checkEmailQuery, [email], async (err, results) => {
        if (err) {
          console.error("Error checking email in connection2:", err.message);
          return res.status(500).json({ success: false, msg: "Server error" });
        }
        if (results.length > 0) {
          return res.status(400).json({ success: false, msg: "Email already in use" });
        }
        
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const insertQuery =
            "INSERT INTO signupdetails (email, username, password, classhandling, section, year, rollno) VALUES (?, ?, ?, ?, ?, ?, ?)";
          connection2.query(insertQuery, [email, username, hashedPassword, classhandling, section, year, rollno], (err) => {
            if (err) {
              console.error("Error inserting user:", err.message);
              return res.status(400).json({ success: false, msg: "Roll no already exists" });
            }
            res.status(200).json({ success: true, msg: "Account created successfully" });
          });
        } catch (hashError) {
          console.error("Error hashing password:", hashError.message);
          res.status(500).json({ success: false, msg: "Server error" });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ success: false, msg: "Unexpected server error" });
  }
});

module.exports = studentsignup;
