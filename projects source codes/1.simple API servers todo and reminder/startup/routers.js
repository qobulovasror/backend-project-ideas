const express = require("express");
const todo = require("../routes/todo");
const user = require('../routes/user');
const category = require('../routes/category');

module.exports = function(app) {
  // middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static('public'));

  //run engine
  // app.set("view engine", "ejs");

  // routes
  app.use("/api/todo", todo);
  app.use("/api/user", user);
  app.use("/api/category", category);

  // root route
  // app.get("/", (req, res) => {
  //   res.render("index");
  // });
};