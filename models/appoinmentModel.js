const mongoose=require('mongoose');

const appoinmentSchema=new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
});
const Appoinment=mongoose.model('appoinment',appoinmentSchema)
module.exports=Appoinment;