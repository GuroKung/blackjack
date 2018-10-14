const mongoose = require("mongoose");

const options = {};

let mongoUrl = process.env.MONGO_URL;

console.log(mongoUrl);

mongoose.Promise = global.Promise;

const connectWithRetry = () => {
  return mongoose.connect(
    mongoUrl,
    options,
    err => {
      if (err) {
        console.error(
          "Failed to connect to mongo on startup - retrying in 10 sec",
          err
        );
        setTimeout(connectWithRetry, 10000);
      }
    }
  );
};

const db = mongoose.connection;

db.on("error", () => {
  console.error.bind(console, "connection error:");
});
db.once("open", () => {
  console.log("Successfully connected to database");
});

if(process.env.NODE_ENV !== "test") connectWithRetry();

module.exports = mongoose;
