var express = require("express");
var randtoken = require("rand-token");
var path = require("path");

// Requiring our models

var Post = require("../models/Post.js");
var Chat = require("../models/Chat.js");
var multer = require("multer");
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./public/assets/UserImages/");
	},
	filename: function(req, file, callback) {
		filenameImg = randtoken.generate(12);
		callback(null, filenameImg + path.extname(file.originalname));
	}
});
var upload = multer({ storage: storage });
var path = require("path");

// Requiring our controllers

var userController = require("../controllers/userController");
var postController = require("../controllers/postController");
var chatController = require("../controllers/chatController");
var commentController = require("../controllers/commentController");

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

// Remove friend to User
router.get("/User/:userId/Unfriend/:friendId", userController.removeFriend);

// Accept friend request
router.get("/:userId/Accept/:friendId", userController.acceptFriend);

// Reject friend request
router.get("/:userId/Reject/:friendId", userController.rejectFriend);

// Get all Users
router.get("/Users", userController.allUsers);

// Get one User
router.get("/Users/:id", userController.oneUser);

// Get one User by id
router.get("/Users/id/:id", userController.oneUserId);

// get one User and delete
router.get("/Delete/User/:id", userController.deleteUser);


// POST

router.post("/Post/pic/:id", upload.any(), postController.uploadPic);

// Create a new Post
router.post("/Post", postController.createPost);

// Update a Post
router.post("/Post/Update/:id", postController.updatePost);

// Add tagged User to Post
router.get("/Post/:postId/Tag/:userId", postController.addTagged);

// Remove tagged User from Post
router.get("/Post/:postId/Untag/:userId", postController.removeTagged);

// Get all Posts
router.post("/Posts", postController.allPosts);

// Get one Post
router.get("/Posts/:id", postController.onePost);

// Get one Post and delete
router.get("/Delete/Post/:id", postController.deletePost);


// COMMENT

// Create a new Comment
router.post("/Comment", commentController.createComment);

// Update a Comment
router.post("/Comment/Update/:id", commentController.updateComment);

// Get all Comment
router.get("/Comments", commentController.allComments);

// Get one Comment
router.get("/Comments/:id", commentController.oneComment);

// Get one Comment and delete
router.get("/Delete/Comments/:id", commentController.deleteComment);


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
router.get("/Chats/:id1/:id2", chatController.oneChat);

// Get one Chat and delete
router.get("/Delete/Chat/:id", chatController.deleteChat);


module.exports = router;
