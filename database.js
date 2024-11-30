const mongoose = require("mongoose");

mongoose
  .connect(process.env.uriMongo)
  .then(() => console.log(`${process.env.uriMongo.split("@")[1]} Connected!`))
  .catch((err) => console.error(err));

module.exports = mongoose;
