const Mongoose=require('mongoose');
const bookAppoinment=new Mongoose.Schema({
    date:{
        type:date,
        required:true,
    },
    time:{
        type:time,
        required:true,
    }
})

const Appointment= mongoose.model("Appointment",bookAppoinment);
module.exports=Appointment;