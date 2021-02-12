const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Creating the schema for the database

const memSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly Enter the name of the member'
    },
    Date_Joined: {
        type: Date,
        default: Date.now
    },
    status: {
        type : [{
            type:String,
            enum:['verified', 'not_verified', 'pending']
        }],
        default:['pending']
    }

});
//export the schema
module.exports = mongoose.model('memberModel', memSchema);