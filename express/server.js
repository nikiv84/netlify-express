"use strict";
const express = require("express");
const path = require("path");
const cors = require("cors");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const MAPS_API_KEY = process.env.MAPS_API_KEY;
app.use(cors());

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});
router.get("/maps_api_key", (req, res) => res.json({ apiKey: MAPS_API_KEY }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
