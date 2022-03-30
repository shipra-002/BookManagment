const reviewModel = require("../models/reviewModel.js")
const bookModel = require("../models/bookModel")


const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true

}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const rating1 =function(val){
    if(val < 0 || val >5 || val  % 0.5) {
    return (val);
  
 }
}
const createReview = async function (req, res){
    try {
let data = req.body
const {
   
bookId,
reviewedBy,
review,
rating,
reviewedAt,
isDeleted

} = data

if(!isValid(bookId)){
    return res.status(400).send({status:false, msg:"book id require"})
}
if(!isValid(reviewedBy)){
    return res.status(400).send({status:false, msg:"reviewedBy require"})
}
// if(!isValid(review)){
//     return res.status(400).send({status:false, msg:"review require"})
// }
if(!isValid(rating)){
    return res.status(400).send({status:false, msg:"rating require"})
}

if(rating1(rating)){
return res.status(400).send({status:false, msg: "provide between 1 to 5"})
}
if(!isValid(reviewedAt)){
    return res.status(400).send({status:false, msg:"reviewedAt require"})
}

//let Id = req.params.bookId


let savedData = await reviewModel.create(data)
res.status(201).send({status :true, msg:"succesfully run", data: savedData })
    }
catch (err) {
        console.log("This is the error.", err.message)
        res.status(500).send({ msg: "error", error: err.message })
    }


}







module.exports.createReview= createReview