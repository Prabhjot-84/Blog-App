import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const salt = bcrypt.genSaltSync(10); 
const secret = 'starlink893hasinvadedearth894today';

export const registerFunc = async (req, res) => {
    const {username, password} = req.body;
    
    try{
        const userDoc = await User.create({ 
            username, 
            password:bcrypt.hashSync(password,salt)
        });
        res.json( userDoc );
    }
    
    catch(e){
        res.status(400).json(e);
        console.log(e);
    }
}

export const loginFunc = async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    
    // res.json(passOk);

    if( passOk ){
        jwt.sign( {username, id:userDoc._id}, secret, {}, (error, token) => {
            if( error ) throw error;
            res.cookie('token', token).json('ok');
        } );
    }
    else{
        res.status(400).json('wrong credentials');
    }

}