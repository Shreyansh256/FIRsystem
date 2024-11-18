import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const Audio = mongoose.model("Audio", audioSchema);
export default Audio;