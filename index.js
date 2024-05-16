// 1. imporing express
const express=require('express');
const dotenv=require('dotenv');
const mongoose =require('mongoose');
const connectDB = require('./database/database');
const { options } = require('./routes/userRoutes');

const cors=require('cors')


// 2. Creating an express app 
const app=express();
//Jason Condig 
app.use(express.json())

//Cors Config
const corsOptions={
    origin:true,
    credentials:true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions))


//configuring dotenv
dotenv.config()


//connecting to database
connectDB();
// mongoose.connect(process.env.MONGODB_CLOUDURL).then(()=>{console.log("Database connected sucessfully")})
//.then is run only if the database is connected else it does print the statements inside the .then function
// this function is transferred to database.js 
    
//const myFcn=()=> {};
//arrow functioxn

// 3.Defining the port
// const PORT=5500;
const PORT=process.env.PORT;



//4. starting the server

//`` this is used to make it dynamic



//5.Creating a test route or end point(post get delete update)

//app.get('/test' yo part routes ma xa bhane aki chai 
app.get('/test',(req,res)=>{
    res.send("Test API is Working..!")
})

app.get('/test_new',(req,res)=>{
    res.send("New API is Working..!")
})


// Configure user routes 
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/product',require('./routes/productRoutes'))


//http://localhost:5000/api/user/create

// API URL:: http://localhost:5500/test

app.use('/api/user', require('./routes/contactRoutes'))
app.use('/api/reservation', require('./routes/reservationRoutes'))
app.use('/api/appointments', require('./routes/appointmentRoutes'))


app.listen(PORT,()=>{
    console.log(`Server-app is running on ${PORT}`)
})