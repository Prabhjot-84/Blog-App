const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user')
const bcrypt = require('bcrypt');

const app = express();

const PORT = 8000;

const salt = bcrypt.genSaltSync(10);

app.use( cors() );
app.use( express.json() );

mongoose.connect('mongodb+srv://Prabhjot:godlikespeed84@cluster0.a0xihpu.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try{
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt)
        });
        res.json( userDoc );
    }
    catch(e){
        res.status(400).json(e);
    }
});

app.post('/login', async(req, res) => {
    const {username, password} = req.body; 
    const userDoc = await User.findOne( {username})
    const passOk = bcrypt.compareSync(password, userDoc.password);
    res.json(passOk);
})

app.listen(PORT, () => {
    console.log(`server is running successfully on PORT ${PORT}` )
});


//mongodb+srv://Prabhjot:godlikespeed84@cluster0.a0xihpu.mongodb.net/?retryWrites=true&w=majority