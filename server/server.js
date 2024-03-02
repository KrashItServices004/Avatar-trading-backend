const app = require("./app");
const dotenv = require("dotenv").config();
const cloudinary = require('cloudinary')
const connectDB = require("./database/dbconnect");


// handeling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the server due to Uncaught Exception`);

  process.exit(1);
});

// config
// dotenv.config({ path: "backend/config/config.env" });

// connecting Database
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
});

// Unhandled promis rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the server due to Unhandled Promis Rejection`);

  server.close(() => {
    process.exit(1);
  });
});