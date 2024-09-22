import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(`${process.env.MONGO_SERVER}`)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a video schema
const videoSchema = new mongoose.Schema({
    number:{type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoPath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

const newVideos =new mongoose.model('videoSchema', videoSchema);

export default newVideos;