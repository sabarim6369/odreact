const express = require("express");
const bcrypt = require("bcrypt");
const { connection2,connection1 } = require("../sqlconnection"); // Direct import
const teacherlogin = express.Router();


teacherlogin.post("/teacherlogin",async(req,res)=>{
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

module.exports=teacherlogin