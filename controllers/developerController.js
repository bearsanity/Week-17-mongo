const { Developer } = require("../models/Developer");

module.exports = {
    // GET /api/developers
    async getDevelopers(req, res) {
        try {
            const developers = await Developer.find();
            return res.json(developers);
        } catch (err) {
            return res
                .status(500)
                .json({message: "Failed to fetch developers", error: err.message})
        }
    },

    // GET /api/developers/:developerId
    async getOneDeveloper(req, res) {
        try {
            const developer = await Developer
                .findById(req.params.developerId)
                .populate('posts')
                .populate('connections');

            if (!developer) {
                return res
                    .status(404)
                    .json({message: "No developer found with that id"})
            }

            return res.json(developer);
        } catch (err) {
            return res
                .status(500)
                .json({message: "Failed to fetch developer", error: err.message})
        }
    },

    // POST /api/developers
    async createOneDeveloper(req, res) {
        try {
            const developer = await Developer.create(req.body);
            return res.status(201).json(developer);
        } catch (err) {
            return res  
                .status(400)
                .json({ message: "Failed to create developer"})
        }
    },

    // PUT /api/developers/:developerId
    async updateOneDeveloper(req, res) {
        try {
            const developer = await Developer.findByIdAndUpdate(
                req.params.developerId,
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!developer) {
                return res
                    .status(404)
                    .json({message: "No developer found with that id"})
            };

            return res.json(developer);
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Failed to update developer", error: err.message });
        }
    },

    // DELETE /api/developers/:developerId	
    async deleteOneDeveloper(req, res) {
        try {
            const developer = await Developer.findByIdAndDelete(req.params.developerId);

            if (!developer) {
                return res
                    .status(404)
                    .json({message: "No developer found with that id"})
            }

            return res.json(developer);
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Failed to delete developer", error: err.message });
        }
    },

    // POST	Add a connection
    async addConnection(req, res) {
        try {
            const developer = await Developer.findByIdAndUpdate(
                req.params.developerId,
                { $addToSet: { connections: req.params.connectionId }},
                { new: true }
            );

            if (!developer) {
                return res
                    .status(404)
                    .json({message: "No developer found with that id"})
            };
            return res.json(developer);
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Failed to add connection", error: err.message });
        }
    },

    // DELETE Remove a connection
    async deleteConnection(req, res) {
        try {
            const developer = await Developer.findByIdAndUpdate(
                req.params.developerId,
                { $pull: { connections: req.params.connectionId }},
                { new: true }
            );

            if (!developer) {
                return res
                    .status(404)
                    .json({message: "No developer found with that id"})
            };
            return res.json(developer);
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Failed to remove connection", error: err.message });
        }
    },
}