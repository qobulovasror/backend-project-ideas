const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
// app.get("/random", (req, res) => {
//   res.render("random");
// });
// app.get("/time", (req, res) => {
//   res.render("time");
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
