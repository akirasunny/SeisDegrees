var Post = require("../models/Post.js");
var User = require("../models/User.js");
var path = require("path");

module.exports = {
    uploadPic: function(req, res, next) {
        if (req.files.length > 1) {
            var files = req.files.slice(0, 3).filter(function(data) {
                return (data.mimetype.indexOf("image") !== -1);
            })
            var images = files.map(function(data) {
                return ("/" + data.path);
            });
            res.send(images);
        }
        else {
            var image = [("/" + req.files[0].path)]
            res.send(image);
        }

    },
    createPost: function(req, res) {

        // Create new Post w/ data from browser
        var newPost = new Post(req.body);
        // Save the new Post to mongoose
        newPost.save(function(error, post) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Otherwise send the new Post to the browser.
            else {
                console.log(post)
                User.findOneAndUpdate({ _id: req.body.owner }, { $addToSet: { "posts": post } }, { new: true },
                    function(err, updatedUser) {
                        // Send any errors to the browser
                        if (err) {
                            res.send(err);
                        }
                        // Or send the updatedUser to the browser
                        else {
                            console.log(updatedUser)
                            res.send([updatedUser, post]);
                        }
                    });
            }
        });
    },

    updatePost: function(req, res) {

        // Find the Post by id and update
        Post.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, function(err, updatedPost) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or send the updatedPost to the browser
            else {
                console.log(updatedPost)
                res.send(updatedPost);
            }
        });

    },

    addTagged: function(req, res) {

        // Find the Post by id and add User to the tagged array.
        Post.findOneAndUpdate({ _id: req.params.postId }, { $addToSet: { "tagged": req.params.userId } }, { new: true }, function(err, updatedPost) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or add the Post to the User's tags array.
            else {
                console.log(updatedPost)
                User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { "tags": req.params.postId } }, { new: true },
                    function(err, updatedUser) {
                        // Send any errors to the browser
                        if (err) {
                            res.send(err);
                        }
                        // Or send the updatedUser and updatedPost to the browser
                        else {
                            console.log(updatedUser)
                            res.send([updatedUser, updatedPost]);
                        }
                    });
            }
        });

    },

    removeTagged: function(req, res) {

        // Find the Post by id and pull the User from the tagged array.
        Post.findOneAndUpdate({ _id: req.params.postId }, { $pull: { "tagged": req.params.userId } }, { new: true }, function(err, updatedPost) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or pull the Post from the User's tags array.
            else {
                console.log(updatedPost)
                User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { "tags": req.params.postId } }, { new: true },
                    function(err, updatedUser) {
                        // Send any errors to the browser
                        if (err) {
                            res.send(err);
                        }
                        // Or send the updatedUser and updatedPost to the browser
                        else {
                            console.log(updatedUser)
                            res.send([updatedUser, updatedPost]);
                        }
                    });
            }
        });

    },

    allPosts: function(req, res) {

        // Find all Posts
        Post.find({ owner: req.params.id }, null, {sort: {date: -1}}).populate(["owner", "tagged"])
            .exec(function(error, all) {
                // Send any errors to the browser
                if (error) {
                    res.send(error);
                }
                // Or, send our results to the browser
                else {
                    res.send(all);
                }
            });

    },

    onePost: function(req, res) {

        // Find one Post by their id and populate tagged and owner arrays.
        Post.findById(req.params.id).populate(["owner", "tagged"])
            // Now, execute that query
            .exec(function(error, post) {
                // Send any errors to the browser
                if (error) {
                    res.send(error);
                }
                // Or, send our results to the browser, which will now include the Users within each of the specified arrays.
                else {
                    res.send(post);
                }
            });

    },

    deletePost: function(req, res) {

        // Find one Post by their id and populate tagged and owner arrays.
        Post.findByIdAndRemove(req.params.id, function(error, post) {
                // Send any errors to the browser
                if (error) {
                    res.send(error);
                }
                // Or, send our results to the browser, which will now include the Users within each of the specified arrays.
                else {
                    res.send(post);
                }
            });

    }

}