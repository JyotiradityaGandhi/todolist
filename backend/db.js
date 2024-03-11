const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to Database connected");
  })
  .catch((err) => {
    console.error(err.message);
  });

module.exports = mongoose.connection;
