var express = require("express");
var path = require("path");

var apiRoutes = require("./apiRoutes");

var router = new express.Router();

// Use the apiRoutes module for any routes starting with "/api"
router.use("/api", apiRoutes);

// Otherwise send all other requests the index.html page
// React router will handle routing withing the app
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/public/assets/UserImages/:file", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/assets/UserImages/" + req.params.file));
});

router.get("/public/assets/ProfileImages/:file", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/assets/ProfileImages/" + req.params.file));
});

router.get("/public/assets/Carousel/:file", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/assets/Carousel/" + req.params.file));
});

module.exports = router;
