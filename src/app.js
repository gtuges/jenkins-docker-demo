import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my awesome app! - George Tuges, from PNG");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
