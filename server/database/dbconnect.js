const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


const connectDB = async ()=>{
        const conn = mongoose.connect(process.env.DB_URI);
        console.log('mongodb connect');
        
};

module.exports = connectDB;