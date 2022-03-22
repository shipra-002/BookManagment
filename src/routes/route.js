const express = require('express');
const router = express.Router();
const Controller= require("../controller/collegeController.js")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/functionup/colleges", Controller.createCollege)

//router.post("/login", Controller.loginUser)


module.exports = router;