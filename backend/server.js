const express = require("express");
const Readable = require("stream");
const DEFUALT_RESULT_COUNT_PER_PAGE = 15;
const DEFAULT_PAGE = 0;

require("./config/passport");
const rtsIndex = require("./routes/router");

const app = express();

var user = require("./models/user");
var expressHbs = require("express-handlebars");
var session = require("express-session");
var mongoose = require("./database");
var crud = require("./routes/crud")(mongoose);
var schema = require("./models/schema");
var bodyParser = require("body-parser");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var expressHbs = require("express-handlebars");
var session = require("express-session");
var logger = require("morgan");
var passport = require("passport");
var flash = require("connect-flash");

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use(passport.session());

app.use("/", rtsIndex);

app.post("/:entity/:perPage-:page", crud.fetch);
app.post("/:entity/add/", crud.addEntity);
app.post("/:entity/update", crud.updateEntity);
app.post("/:entity/count", crud.count);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

app.listen(4400);
module.exports = app;
