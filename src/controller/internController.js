const { default: mongoose } = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

const isValid = function (value) {
    if (typeof value == 'undefined' || typeof value == 'null' || typeof value == 0) {
        return false
    }
    if (typeof (value) == 'String' || 'Array' && value.length > 0)
        return true
}

const isValidRequestBody = function (value) {
    if (Object.keys(value).length > 0)
        return true
}
const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const createIntern = async function (req, res) {
    try {
        let data = req.body;
        const { name, email, mobile, collegeId } = data
        //const collegeId =req.body.collegeId
        if (!isValidRequestBody(data))
            return res.status(400).send({ status: false, msg: 'data is required' })
        if (!isValid(name))
            return res.status(400).send({ status: false, msg: 'name is required' })
        if (isValid(email)){

        {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)))
                return res.status(400).send({ status: false, msg: "is not a valid email" })
        }
            return res.status(400).send({ status: false, msg: 'email is required' })
    }
        
        if (isValid(mobile))
            if (!(/^([+]\d{2})?\d{10}$/.test(data.mobile))) {
                return res.status(400).send({ status: false, msg: "lease Enter  a Valid Mobile Number" })
            }

        if (!isValid(collegeId))
            return res.status(400).send({ status: false, msg: 'collegeId is required' })

        let id = await collegeModel.findById(collegeId)
        console.log(id)

        if (!isValidObjectId(id)) {
            res.status(400).send({ status: false, message: `${id} is not a valid College Id` })
            return
        }

        let internCreated = await internModel.create(data)
        return res.status(201).send({ status: true, output: internCreated })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


const getCollege = async function (req, res) {
    try {
        let collegeName = req.query.collegeName



        if (!isValid(collegeName))
            return res.status(400).send({ status: false, msg: 'collegeName is required' })
        let Lowercase = collegeName.toLowerCase()

        const filterCollege = await collegeModel.findOne({ name: Lowercase })
        if (!filterCollege) {
            return res.status(400).send({ status: false, msg: "no college found" })

        }
        //collegeName se name match krega
        console.log({ filterCollege })

        const collegeGet = await internModel.find({ collegeId: filterCollege._id })
        // console.log(collegeGet)
        const result = { name: filterCollege.name, fullName: filterCollege.fullName, logoLink: filterCollege.logoLink }
        if (collegeGet.length > 0) {
            result["Interests"] = collegeGet
            return res.status(200).send({ data: result })
        }
        if (collegeGet.length == 0) {
            result["Interests"] = "No Interns Avaiable"
            return res.status(401).send({ data: result })
        }
    }
    catch (error) {
        res.status(500).send({ status: false, err: error.message })
    }
}




module.exports.createIntern = createIntern
module.exports.getCollege = getCollege





