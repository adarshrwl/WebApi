const mongoose = require('mongoose');
const productSchema= new mongoose.Schema({
    //fields:name price description image category
    productName:{
        type:String,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true,
    },
    productDescription:{
        type:String,
        required:true,
        maxlength:300
    },
    productCategory:{
        type:String,
        required:true,
        
    },
    productImage:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Products=mongoose.model('products',productSchema)
module.exports(Products)