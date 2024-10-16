import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
});

export default mongoose.model('Post', PostSchema);