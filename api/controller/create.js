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


// Function called for user REGISTRATION
export const registerFunc = async (req, res) => {
    const {username, password} = req.body;

    // Check if username or password is empty
    if (username === '' || password === '') {
        res.status(400).json({ error: 'Username and password are required.' });
    }

    try{
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)  // password encryption
        });
        res.json( userDoc );  // sending back response
    }
    catch(e){
        res.status(400).json(e);
    }
}


// Function called for LOGIN req.
export const loginFunc = async (req, res) => {
    
    const {username, password} = req.body; 

    try{
        // checking if someone with this username is registered or not
        const userDoc = await User.findOne( {username} );

        // checking if login password is same as that of registered
        const passOk = bcrypt.compareSync(password, userDoc.password);

        if( passOk ){
            // logged-in
            Jwt.sign( {username, id:userDoc._id}, secret, {}, (err, token) => {
                if(err) throw err;
                res.cookie( 'token', token).json({
                    id: userDoc._id,
                    username,
                });
            })
        }
        else{
            res.status(400).json('Wrong Credentials');
        }
    }
    catch(e){
        res.status(400).json(e);
    }
}


// Creating a post 
export const postFunc = async (req, res) => {
    const { token } = req.cookies;

    Jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        const { title, summary, content } = req.body;

        try {
            const postDoc = await PostModel.create({
                title,
                summary,
                content,
                author: info.id,
            });

            res.json(postDoc);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Failed to create post' });
        }
    });
};
