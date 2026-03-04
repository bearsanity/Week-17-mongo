const Post = require("../models/Post");
const Developer = require("../models/Developer");

module.exports = {
    // GET /api/posts
    async getPosts(req, res) {
        try {
            const posts = await Post.find().sort({ createdAt: -1 });
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
            const post = await Post
                .findById(req.params.postId)

            if (!post) {
                return res
                    .status(404)
                    .json({message: "No post found with that id"})
            }

            return res.json(post);
        } catch (err) {
            return res
                .status(500)
                .json({message: "Failed to fetch post", error: err.message})
        }
    },

    // POST /api/posts
    async createOnePost(req, res) {
        try {
            const post = await Post.create(req.body);
            const developer = await Developer.findByIdAndUpdate(
                req.body.developerId,
                { $addToSet: { posts: post._id }},
                { new: true }
            );
            if (!developer) {
                return res
                    .status(404)
                    .json({message: "No developer found with that id"})
            };
            return res.status(201).json({ developer, post });
        } catch (err) {
            return res  
                .status(400)
                .json({ message: "Failed to create post"})
        }
    },

    // PUT /api/posts/:postId
    async updateOnePost(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params.postId,
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
            const post = await Post.findByIdAndDelete(req.params.postId,);

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

    // POST	Add a reaction
    async addReaction(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params.postId,
                { $addToSet: { reactions: req.body }},
                { new: true }
            );

            if (!post) {
                return res
                    .status(404)
                    .json({message: "No post found with that id"})
            };
            return res.json(post);
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Failed to add reaction", error: err.message });
        }
    },

    // DELETE Remove a reaction
    async deleteReaction(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params.postId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!post) {
                return res
                    .status(404)
                    .json({message: "No post found with that id"})
            };
            return res.json(post);
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Failed to delete reaction", error: err.message });
        }
    },

}