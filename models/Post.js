const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction.js');

const postSchema = new Schema(
  {
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString(),
    },
    authorUsername: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { getters: true },
    id: false,
  },
);

postSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = model('Post', postSchema)