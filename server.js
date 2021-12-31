const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
var cors = require("cors");
const knex = require("knex");
// const { password } = require("pg/lib/defaults");
const register = require("./Controllers/register");
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "facerecogniser",
  },
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

//Home
app.get("/", (req, res) => {
  res.json(db.users);
});

//SignIn --> post req with sucess/failure
app.post("/signin", (req, res) => {signin.handlesignin(req, res, db, bcrypt)});

//Register --> user data
app.post("/register", register.handleregister(db,bcrypt));  //Another Way of passing values to function

// Profile/:userId --->GET = user
app.get("/profile/:id", (req, res) => {profile.handleprofile(req,res,db)});

//image --PUT -->Entries Count
app.put("/image", (req,res) => {image.hanldeimage(req,res,db)});

app.post("/imageurl", (req, res) => {image.apiCall(req,res)});

app.listen(3000, () => {
  console.log("Success!");
});