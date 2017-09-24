var express = require("express");

// Requiring our models

var Post = require("../models/Post.js");
var Chat = require("../models/Chat.js");

// Requiring our controllers

var userController = require("../controllers/userController");
var postController = require("../controllers/postController");

var router = new express.Router();

/*// Get all articles (or optionally a specific article with an id)
router.get("/articles/:id?", articlesController.index);
// Create a new article using data passed in req.body
router.post("/articles", articlesController.create);
// Update an existing article with a speicified id param, using data in req.body
router.patch("/articles/:id", articlesController.update);
// Delete a specific article using the id in req.params.id
router.delete("/articles/:id", articlesController.destroy);*/

// USER

// Create a new User
router.post("/User", userController.createUser);

// Update a User
router.post("/User/Update/:id", userController.updateUser);

// Add friend to User
router.get("/User/:userId/Friend/:friendId", userController.addFriend);

// Add friend to User
router.get("/User/:userId/Unfriend/:friendId", userController.removeFriend);

// Accept friend request
router.get("/:userId/Accept/:friendId", userController.acceptFriend);

// Accept friend request
router.get("/:userId/Reject/:friendId", userController.rejectFriend);

// Get all Users
router.get("/Users", userController.allUsers);

// Get one User
router.get("/Users/:id", userController.oneUser);

// get one User and delete
router.get("/Delete/User/:id", userController.deleteUser);


// POST

// Create a new Post
router.post("/Post", postController.createPost);

// Update a Post
router.post("/Post/Update/:id", postController.updatePost);

// Add tagged User to Post
router.get("/Post/:postId/Tag/:userId", postController.addTagged);

// Remove tagged User from Post
router.get("/Post/:postId/Untag/:userId", postController.removeTagged);

// Get all Posts
router.get("/Posts", postController.allPosts);

// Get one Post
router.get("/Posts/:id", postController.onePost);

// Get one Post and delete
router.get("/Delete/Post/:id", postController.deletePost);


module.exports = router;
