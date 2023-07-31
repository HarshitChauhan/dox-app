const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.send("Dox server is up and running!!!");
});

router.get("/healthCheck", (req, res) => {
  res.status(200).send("Dox server is up and running!!!");
});

// The catch-all route handler
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
module.exports = router;
