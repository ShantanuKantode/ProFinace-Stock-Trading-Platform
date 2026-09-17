require('dotenv').config()

const express = require("express");
const mongoose  = require("mongoose");

const PORT = process.env.PORT || 3002; 
const uri =  process.env.MONGO_URI ;



const app = express();


app.listen(3002 , () =>{
   console.log("App started !");
   mongoose.connect(uri);
   console.log("Database Connected");
});