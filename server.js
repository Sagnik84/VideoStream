// module.mjs

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import newVideos from './mongodb.js';
// Load environment variables
dotenv.config();

const app = express();
const PORT =  3000;

// Connect to MongoDB

// Serve static files from "public" directory
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(path.resolve(), 'public', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Serve static files from "public/uploads" directory (for uploaded videos)
app.use('/uploads', express.static(path.join(path.resolve(), 'public', 'uploads')));

// Handle video upload
app.post('/upload-video', upload.single('videoFile'), async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description || !req.file) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const videoPath = `/uploads/${req.file.filename}`;
        
        await newVideos.insertMany({title , description , videoPath});

        res.json({ message: 'Video uploaded successfully!', videoPath });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Failed to upload video' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
