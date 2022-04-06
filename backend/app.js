const path=require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require('mongoose');

const formRoutes= require('./routes/forms');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb://localhost:27017/school")
  .then(()=>{
    console.log('connected to database')
  })
  .catch(()=>{
    console.log('error!')
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );
  next();
});

app.use("/posts",formRoutes);
app.use("/user", userRoutes);

module.exports = app;
