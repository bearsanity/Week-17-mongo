const { Schema, model } = require('mongoose');

const developerSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    headline: String,
    skills: [String],
    posts:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    connections: [{
        type: Schema.Types.ObjectId,
        ref: 'Developer',
    }],
  },
  {
    toJSON: { getters: true },
    id: false,
  },
);

developerSchema.virtual('connectionCount').get(function () {
    return this.connections.length;
});

developerSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

module.exports = model('Developer', developerSchema);