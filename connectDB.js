const mongoose = require("mongoose");


const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://Prakash06:701196@cluster0.pyyef.mongodb.net/')
    .then(console.log("db connected success")).catch(err => console.log(err));
}


module.exports = connectDB;


