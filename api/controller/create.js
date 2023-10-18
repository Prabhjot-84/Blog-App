import User from "../models/user.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import multer from "multer";
const uploadMiddleware = multer({ dest: 'uploads/' });

const salt = bcrypt.genSaltSync(10);
const secret = 'starlink893hasinvadedearth894today';

// Function called for user REGISTRATION
export const registerFunc = async (req, res) => {
    const {username, password} = req.body;
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

    // checking if someone with this username is registered or not
    const userDoc = await User.findOne( {username} );

    // checking if login password is same as that of registered
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if( passOk){
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



// Creating a post 
export const postFunc = [
    uploadMiddleware.single('file'), // Use the uploadMiddleware as a middleware
    async (req, res) => {
        // extracting the original name from the uploaded file
        const {originalname} = req.file;
        // breaking the file name into 
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        res.json({ext});
        // res.json({files: req.file});
    },
  ];