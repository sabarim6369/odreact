const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { connection1, connection2 } = require("./sqlconnection");

app.use(cors());
app.use(express.json());

app.post("/studentlogin", async (req, res) => {
    const { email, password } = req.body;
    const userQuery = "SELECT username, password FROM signupdetails WHERE email = ?";
    const odQuery = "SELECT internallimit, externallimit FROM oddays WHERE email = ?";

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
            const hashedPassword = user.password;

            const isMatch = await bcrypt.compare(password, hashedPassword);

            if (!isMatch) {
                return res.status(401).json({ msg: "Incorrect password" });
            }

            connection2.query(odQuery, [email], (odErr, odResults) => {
                if (odErr) {
                    console.error("Error occurred while fetching OD limits:", odErr.message);
                    return res.status(500).json({ msg: "Error occurred while fetching OD limits" });
                }

                const odData = odResults.length > 0 ? odResults[0] : { internallimit: 0, externallimit: 0 };

                return res.status(200).json({
                    success: true,
                    msg: "Login successful",
                    name: user.username,
                    internallimit: odData.internallimit,
                    externallimit: odData.externallimit
                });
            });
        });
    } catch (error) {
        console.error("Server error:", error.message);
        return res.status(500).json({ msg: "Server error" });
    }
});


app.post("/teacherlogin",async(req,res)=>{
    const{email,password}=req.body;
    console.log(email,password);
   
    const query="select * from signupdetails where email=?";
    connection1.query(query,[email],async(err,results)=>{
        if(err){
            return res.status(401).json({msg:"some error occured"});
        }
        if (results.length === 0) {
            return res.status(404).json({ msg: "Email not found" });
        }
       else{
        const user = results[0];
        const hashedPassword = user.password;

        try {
           
            const isMatch = await bcrypt.compare(password, hashedPassword);

            if (isMatch) {
                
                return res.status(200).json({ success: true, msg: "Login successful" }); 
            } else {
             
                return res.status(401).json({ msg: "Incorrect password" });
            }
            
            
        } catch (compareError) {
            console.error("Error comparing passwords:", compareError.message);
            return res.status(500).json({ msg: "Server error" });
        }
       }
    })
})

app.listen(4000, () => {
    console.log("Server started listening on port 4000");
});
