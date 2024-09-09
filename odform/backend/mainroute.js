const express = require("express");
const router = express.Router();
const studentlogin = require("./routes/studentlogin");
const teacherlogin = require("./routes/teacherlogin");
const studentsignup = require("./routes/studentsignup");
const studentodinfo=require("./routes/studentodinfo")
router.use("/", studentlogin);
router.use("/", teacherlogin);
router.use("/",studentsignup)
router.use("/",studentodinfo)
module.exports = router;
