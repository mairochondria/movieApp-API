const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: [true, "Comment text is required"]
    }
    
});

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie name is required"]
    },
    director: {
        type: String,
        required: [true, "Movie director is required"]
    },
    year: {
        type: Number,
        required: [true, "Movie year must be a positive number"]
    },
    description: {
        type: String,
        required: [true, "Movie description is required"]
    },
    genre: {
        type: String,
        required: [true, "Movie genre is required"]
    },
    comments: [commentSchema]
    
});

module.exports = mongoose.model("Movie", movieSchema);