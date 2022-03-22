const mongoose = require("mongoose")
const collegeModel = require("../models/collegeModel")


const createCollege = async function (req, res) {
    try{
        const data = req.body
    if (!data)
        return res.status(400).send({ status: false, mag: "plz provide valid college Details" })
    const saveData = await collegeModel.create(data)
    return res.status(200).send({ status: true, data: saveData, msg: "valid Details" })
}
catch(err){
    return res.status(500).send({status:false, msg:err.message})
}
}
module.exports.createCollege = createCollege
