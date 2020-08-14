const mongoose = require("mongoose");
const dbPath = "mongodb://taxiabanos:Fohkae7r@localhost/abanostaxi";
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
  }
mongoose.connect(dbPath, options);
const db = mongoose.connection;
let connected = false;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
    connected = true
});
module.exports = mongoose