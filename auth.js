const express = require("express");
const bodyParser = require("body-parser");
// import jwt, passport and passport-jwt modules
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "wowwow";

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

const app = express();
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// add a basic route
app.get("/", function(req, res) {
  res.json({ message: "Express is up!" });
});
// start the app
app.listen(3001, function() {
  console.log("Express is running on port 3001");
});

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const Sequelize = require("sequelize");
// initialize an instance of Sequelize
const sequelize = new Sequelize({
  database: "users_db",
  username: "root",
  password: "",
  dialect: "mysql"
});
// check the database connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.error("Unable to connect to the database:", err));

// create user model
const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});
// create table with user model
User.sync()
  .then(() => console.log("Oh yeah! User table created successfully"))
  .catch(err => console.log("BTW, did you enter wrong database credentials?"));

// create some helper functions to work on the database
const createUser = async ({ name, password }) => {
  return await User.create({ name, password });
};
const getAllUsers = async () => {
  return await User.findAll();
};
const getUser = async obj => {
  return await User.findOne({
    where: obj
  });
};

// get all users
app.get("/users", function(req, res) {
  getAllUsers().then(user => res.json(user));
});
// register route
app.post("/register", function(req, res, next) {
  const { name, password } = req.body;
  createUser({ name, password }).then(user =>
    res.json({ user, msg: "account created successfully" })
  );
});

app.use(passport.initialize());

// login route
app.post("/login", async function(req, res, next) {
  const { name, password } = req.body;
  if (name && password) {
    // we get the user with the name and save the resolved promise
    // returned;
    let user = await getUser({ name });
    if (!user) {
      res.status(401).json({ msg: "No such user found", user });
    }
    if (user.password === password) {
      // from now on we"ll identify the user by the id and the id is
      // the only personalized value that goes into our token
      let payload = { id: user.id };
      console.log("payload", payload);
      let token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey);
      console.log("token", token);
      res.json({ msg: "ok", token: token });
    } else {
      res.status(401).json({ msg: "Password is incorrect" });
    }
  }
});

// protected route
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.json({
      msg: "Congrats! You are seeing this because you are authorized"
    });
  }
);
