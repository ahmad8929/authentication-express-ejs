const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");

const path = require("path");

const userModel = require("./user.model");
const utils = require("./utils");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(compression());

(async function () {
  try {
    mongoose.connect("mongodb://0.0.0.0:27017/auth");
    console.log("connection established");
  } catch (err) {
    console.error(err);
  }
})();

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// signup

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", async function (req, res) {
  try {
    const { firstName, lastName, phoneNo, email, password } = req.body;

    const access_token = utils.generateToken({
      firstName,
      lastName,
      phoneNo,
      email,
    });

    const hashed_pwd = utils.Bcrypt.hash(password);
    const user = await userModel.create({
      firstName,
      lastName,
      phoneNo,
      email,
      password: hashed_pwd,
    });

    return res.json({
      user,
      access_token,
    });
  } catch (err) {
    return res.json(err);
  }
});

// Middleware

async function AuthMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ message: "Token not passed" });
  }

  const jwt = token.split(" ")[1];

  const user = jsonwebtoken.verify(jwt, "SECRET");

  req.user = user;

  next();
}

app.listen(8000, () => console.log("server rolling on port. 8000"));
