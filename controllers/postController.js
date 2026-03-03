const { Post } = require("../models");

module.exports = {
    // GET /api/posts
    async getPosts(req, res) {
        try {
            const posts = await post.find();
            return res.json(posts);
        } catch (err) {
            return res
                .status(500)
                .json({message: "Failed to fetch posts", error: err.message})
        }
    },

    // GET /api/posts/:postId
    async getOnePost(req, res) {
        try {
            const post = await post
                .findById(req.params.postId)
                .populate('posts')
                .populate('connections');

            if (!post) {
                return res
                    .status(404)
                    .json({message: "No post found with that id"})
            }

            return res.json(course);
        } catch {
            return res
                .status(500)
                .json({message: "Failed to fetch post", error: err.message})
        }
    },

    // POST /api/posts
    async createOnePost(req, res) {
        try {
            const post = await post.create(req.body);
            return res.status(201).json(post);
        } catch (err) {
            return res  
                .status(400)
                .json({ message: "Failed to create post"})
        }
    },

    // PUT /api/posts/:postId
    async updateOnePost(req, res) {
        try {
            const post = await post.findByIdAndUpdate(
                req.params.courseId,
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!post) {
                return res
                    .status(404)
                    .json({message: "No post found with that id"})
            }

            return res.json(post);
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Failed to update post", error: err.message });
        }
    },

    // DELETE /api/posts/:postId	
    async deleteOnePost(req, res) {
        try {
            const post = await post.findByIdAndDelete(req.params.courseId,);

            if (!post) {
                return res
                    .status(404)
                    .json({message: "No post found with that id"})
            }

            return res.json(post);
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Failed to update post", error: err.message });
        }
    },
}