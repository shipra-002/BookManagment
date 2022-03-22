const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
        trim:true
    }, 
        
        email: {
            type:String,
            required:true,
            match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'], 
            unique:true
        },
        mobile : {
            type : Number,
            unique : true,
            required : true,
            minlength : 10,
            maxlength : 12,
            pattern : "1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?",
    
        },
     collegeId: {
         type:ObjectId, 
         ref: "college", 
         
    isDeleted: {
        type: Boolean, 
        default: false
    }

}},{timeStamps: true})

module.exports = mongoose.model('intern', internSchema)