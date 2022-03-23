const express = require('express');
const router = express.Router();
const collegeController = require("../controller/collegeController.js")
const internController = require("../controller/internController.js")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/intern", internController.createIntern)
router.get("/functionup/collegeDetails", internController.getCollege)




//router.post("/login", Controller.loginUser)


module.exports = router;