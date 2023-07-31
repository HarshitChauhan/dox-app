const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

router.get("/healthCheck", (req, res) => {
  res.status(200).send("Dox server is up and running!!!");
});

router.get("/documents/:id", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
router.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// The catch-all route handler
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = router;
