const express = require("express");
const bcrypt = require("bcrypt");
const { connection2 } = require("../sqlconnection");
const studentodinfo = express.Router();
const multer = require("multer");


const storage = multer.memoryStorage(); // Store in memory for easy base64 encoding
const upload = multer({ storage: storage });

studentodinfo.post(
    "/studenthome1",
    upload.fields([
      { name: "photo", maxCount: 1 },
      { name: "pdf", maxCount: 1 },
    ]),
    (req, res) => {
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);
        console.log("hellllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
     
  
        const {
            reason,
            start_date,
            end_date,
            total_days,
            related_to,
            applieddate,
            odtype,
            email,
            name,
            classs,
            section,
            id,
            rollno,
            year
          } = req.body;
          console.log(reason,classs,name,email,section,id)
  
      if (!req.files["photo"] || !req.files["pdf"]) {
        return res.status(400).send("Required files not uploaded.");
      }
  
      const photo = {
        data: req.files["photo"][0].buffer.toString("base64"),
        mimeType: req.files["photo"][0].mimetype,
      };
  
      const pdf = req.files["pdf"][0].buffer.toString("base64");
  
     
  
      const insertQuery =
        "INSERT INTO studentoddetails (email, username, classs, rollno, section, reason, startdate, enddate, total_days, relatedto, photo, pdf, applieddate, presentyear, odtype,applied_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,NOW())";
  
      const duplicate = "INSERT INTO oddays(total_days, odtype, email,applied_time) VALUES (?, ?, ?,NOW())";
  
      connection2.query(duplicate, [total_days, odtype, email], (err) => {
        if (err) {
          console.error("Error inserting OD details:", err.message);
          return res.status(500).send("Server error");
        }
  
        connection2.query(
          insertQuery,
          [
            email,
            name,
            classs,
            rollno,
            section,
            reason,
            start_date,
            end_date,
            total_days,
            related_to,
            photo.data,
            pdf,
            applieddate,
            year,
            odtype
          ],
          (err) => {
            if (err) {
              console.error("Error inserting OD details:", err.message);
              return res.status(500).send("Server error");
            }
  
            res.send("Your OD registered successfully");
          }
        );
      });
    }
  );
  module.exports=studentodinfo;