import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from "../models/user.js";
import PostModel from "../models/Post.js"
import bcrypt from 'bcrypt';    // for security
import Jwt from "jsonwebtoken"; // for security
import multer from "multer";    // for uploading files
import fs from "fs";       // fs is file system

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use('/uploads', express.static(__dirname + '/uploads'));

const uploadMiddleware = multer({ dest: 'uploads/' }); 

const salt = bcrypt.genSaltSync(10);
const secret = 'starlink893hasinvadedearth894today';


export const updatePostfunc = async (req, res) => {
    const { token } = req.cookies;

    Jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        const { id, title, summary, content } = req.body;

        try {
            const postDoc = await PostModel.findById(id);

            if (!postDoc) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                return res.status(403).json({ error: 'You are not the author of this post' });
            }

            await postDoc.updateOne({
                title,
                summary,
                content,
            });

            res.json({ success: true, post: postDoc });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ error: 'Failed to update post' });
        }
    });
};