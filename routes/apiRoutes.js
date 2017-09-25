var express = require("express");

// Requiring our models

var Post = require("../models/Post.js");
var Chat = require("../models/Chat.js");

// Requiring our controllers

var userController = require("../controllers/userController");
var postController = require("../controllers/postController");
var chatController = require("../controllers/chatController");

var router = new express.Router();

// USER

// Create a new User
router.post("/User", userController.createUser);

// Validate User login
router.post("/User/Login", userController.validateLogin);

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


// CHAT

// Create a Chat
router.post("/Chat", chatController.createChat);

// Log a message to a Chat
router.post("/Chat/Log/:chatId/:userId", chatController.updateLog);

// Add new member to a Chat
router.get("/Chat/:chatId/Add/:userId", chatController.addMember);

// Add new member to a Chat
router.get("/Chat/:chatId/Remove/:userId", chatController.removeMember);

// Get all Chats
router.get("/Chats", chatController.allChats);

// Get one Chat
router.get("/Chats/:id", chatController.oneChat);

// Get one Chat and delete
router.get("/Delete/Chat/:id", chatController.deleteChat);


module.exports = router;
