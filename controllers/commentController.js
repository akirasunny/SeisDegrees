var Comment = require("../models/Comment.js");
var Post = require("../models/Post.js");

module.exports = {

    createComment: function(req, res) {

        console.log("Creating new Comment!");
        // Create new Comment w/ data from front-end
        var newComment = new Comment(req.body);
        // Save the new Comment to mongoose
        newComment.save(function(error, comment) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Otherwise send the new Comment to the browser.
            else {
                console.log(comment)
                Post.findOneAndUpdate({ _id: req.body.postId }, { $push: { "comments": comment } }, { new: true },
                    function(err, updatedPost) {
                        // Send any errors to the browser
                        if (err) {
                            res.send(err);
                        }
                        // Or send the updatedUser and updatedPost to the browser
                        else {
                            console.log(updatedPost)
                            res.send([updatedPost, comment]);
                        }
                    });
            }
        });

    },


    updateComment: function(req, res) {

        // Find the Comment by id and update
        Comment.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, function(err, updatedComment) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or send the updatedComment to the browser
            else {
                console.log(updatedComment);
                res.send(updatedComment);
            }
        });

    },

    allComments: function(req, res) {

        // Find all Comments
        Comment.find({}, function(error, all) {
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

    oneComment: function(req, res) {

        // Find one Comment by their id and populate messages, members, and owners arrays. (Note: need to specify path)
        Comment.findById(req.params.id, function(error, comment) {
                // Send any errors to the browser
                if (error) {
                    res.send(error);
                }
                // Or, send our results to the browser, which will now include the Messages/Users within each of the specified arrays.
                else {
                    res.send(comment);
                }
            });

    },

    deleteComment: function(req, res) {

        // Find one Comment by their id and remove.
        Comment.findByIdAndRemove(req.params.id, function(error, comment) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Or, send our deleted Comment to the browser.
            else {
                res.send(comment);
            }
        });

    }

}