import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my awesome app ! - George Tuges, is from PNG");
});

app.listen(3000, function () {
  console.log("App listening on port 3000");
});
