const mongoose = require("mongoose")
const collegeModel = require("../models/collegeModel")




const isValid = function (value) {
    if (typeof (value) == 'undefined' || typeof (value) == 'null' || typeof (value) == 0) {
        return false
    }
    if (typeof (value) == 'String' || 'Array' && value.length > 0)
        return true
}

const isValidRequestBody = function (value) {
    if (Object.keys(value).length > 0)
        return true
}



const createCollege = async function (req, res) {
    try {
        const data = req.body
        if (isValidRequestBody(data)) {
            // if (Object.keys(data).length > 0) {
            if (!isValid(data.name)) {
                return res.status(400).send({ status: false, msg: "Name is Mandatory" })
            }
            if (!isValid(data.fullName)) {
                return res.status(400).send({ status: false, msg: "Full name is Mandatory" })
            }
            if ((/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.logoLink))) {

                const savedData = await collegeModel.create(data)

                return res.status(201).send({ status: true, msg: "College detail Saved Successfully", data: savedData })

            } else { res.status(401).send({ msg: "Please Enter A Valid Url" }) }

        } else { res.status(401).send({ Message: "Enter Some Mandatory Detail" }) }

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}







module.exports.createCollege = createCollege
