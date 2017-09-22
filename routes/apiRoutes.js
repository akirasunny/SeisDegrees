var express = require("express");

// var articlesController = require("../controllers/articlesController");
// connect to controllers

var router = new express.Router();

// Get all articles (or optionally a specific article with an id)
router.get("/articles/:id?", articlesController.index);
// Create a new article using data passed in req.body
router.post("/articles", articlesController.create);
// Update an existing article with a speicified id param, using data in req.body
router.patch("/articles/:id", articlesController.update);
// Delete a specific article using the id in req.params.id
router.delete("/articles/:id", articlesController.destroy);

module.exports = router;
