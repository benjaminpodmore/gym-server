const express = require("express");
const path = require("path");
const app = express();

// Static Middleware
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(5000, function (error) {
  if (error) throw error;
  console.log("Server created Successfully");
});
