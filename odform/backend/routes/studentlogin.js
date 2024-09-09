const express = require("express");
const bcrypt = require("bcrypt");
const { connection2 } = require("../sqlconnection");
const studentlogin = express.Router();

studentlogin.post("/studentlogin", async (req, res) => {
    const { email, password } = req.body;
    const userQuery = "SELECT username,year, password,classhandling,id,section,email,rollno FROM signupdetails WHERE email = ?";
    const odQuery = "SELECT internallimit, externallimit FROM oddays WHERE email = ? limit 1";
    const query1 = `
    SELECT odtype, IFNULL(SUM(total_days), 0) AS total_days
    FROM oddays 
    WHERE email = ? AND odtype IN ('Internal', 'External') 
    GROUP BY odtype;
  `;
  
  connection2.query(query1, [email], (err, query1Results) => {
    if (err) {
        console.log(err);
    } else {
        let internalDays = 0;
        let externalDays = 0;

        query1Results.forEach(result => {
            if (result.odtype === 'internal') {
                internalDays = result.total_days;
            } else if (result.odtype === 'external') {
                externalDays = result.total_days;
            }
        });
        console.log(internalDays, externalDays);
    }
  });

    try {
        connection2.query(userQuery, [email], async (err, userResults) => {
            if (err) {
                console.error("Error occurred while fetching user:", err.message);
                return res.status(500).json({ msg: "Error occurred while fetching user" });
            }

            if (userResults.length === 0) {
                return res.status(404).json({ msg: "Email not found" });
            }

            const user = userResults[0];
            const name = user.username;
            const id = user.id;
            const classs = user.classhandling;
            const email = user.email;
            const hashedPassword = user.password;
            const year = user.year;
            const section = user.section;
            const isMatch = await bcrypt.compare(password, hashedPassword);
            const rollno=user.rollno;

            if (!isMatch) {
                return res.status(401).json({ msg: "Incorrect password" });
            }

            connection2.query(odQuery, [email], (odErr, odResults) => {
                if (odErr) {
                    console.error("Error occurred while fetching OD limits:", odErr.message);
                    return res.status(500).json({ msg: "Error occurred while fetching OD limits" });
                }

                const odData = odResults.length > 0 ? odResults[0] : { internallimit: 20, externallimit: 10 };
                console.log(name);

                connection2.query(query1, [email], (err, query1Results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let internalDays = 0;
                        let externalDays = 0;

                        query1Results.forEach(result => {
                            if (result.odtype === 'internal') {
                                internalDays = result.total_days;
                            } else if (result.odtype === 'external') {
                                externalDays = result.total_days;
                            }
                        });

                        console.log(internalDays, externalDays);

                        return res.status(200).json({
                            success: true,
                            msg: "Login successful",
                            name: name,
                            internallimit: odData.internallimit,
                            externallimit: odData.externallimit,
                            internalDays,
                            externalDays,
                            section,
                            email,
                            classs,
                            year,
                            id,
                            rollno
                        });
                    }
                });
            });
        });
    } catch (error) {
        console.error("Server error:", error.message);
        return res.status(500).json({ msg: "Server error" });
    }
});

module.exports = studentlogin;
