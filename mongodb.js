import mongoose from "mongoose";
mongoose.connect('mongodb://0.0.0.0:27017/videostream')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a video schema
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoPath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

const newVideos =new mongoose.model('videoSchema', videoSchema);

export default newVideos;