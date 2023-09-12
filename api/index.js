import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { loginFunc, registerFunc } from './controller/create.js';

const app = express();
const PORT = 4000;

dotenv.config();
app.use( cors({credentials:true, origin:'http://localhost:3000'}) );
app.use( express.json() );

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a0xihpu.mongodb.net/?retryWrites=true&w=majority`);

app.post( '/register', registerFunc);

app.post( '/login', loginFunc)

app.listen(PORT, () => {
    console.log(`server is running successfully on PORT ${PORT}` )
});