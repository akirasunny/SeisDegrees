var express = require("express");

// Requiring our models

var Post = require("../models/Post.js");
var Chat = require("../models/Chat.js");

// Requiring our controllers

var userController = require("../controllers/userController");

var router = new express.Router();

/*// Get all articles (or optionally a specific article with an id)
router.get("/articles/:id?", articlesController.index);
// Create a new article using data passed in req.body
router.post("/articles", articlesController.create);
// Update an existing article with a speicified id param, using data in req.body
router.patch("/articles/:id", articlesController.update);
// Delete a specific article using the id in req.params.id
router.delete("/articles/:id", articlesController.destroy);*/

// Create a new User
router.post("/User", userController.createUser);

// Get all Users
router.get("/Users", userController.allUsers);

// Add friend to User
router.get("/User/:id/Friend/:friendId", userController.addFriend);


module.exports = router;
