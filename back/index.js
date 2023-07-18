import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import cors from 'cors'
import { validationResult } from 'express-validator'
import { registerValidation ,loginValidation} from './validartions/validations.js'

import UserModel from './models/User.js'
import checkAuth from './utils/checkAuth.js'
import *as UserController from './controllers/UserController.js'
import *as ChatController from './controllers/ChatController.js'
 const app=express();
 
 mongoose.connect('mongodb+srv://umedjonsharipov0005:umedumedumed1208@cluster0.hxghf6n.mongodb.net/blog?retryWrites=true&w=majority')
 .then(() => console.log('DB ok'))
 .catch((err) => console.log('DB error', err));
app.use(express.json())
app.use(cors())


app.post("/auth/login",loginValidation,UserController.login);
app.post("/auth/register",registerValidation,UserController.register) 
app.get('/auth/me',checkAuth,UserController.getMe);

app.post('/chat',checkAuth,ChatController.create);
app.get('/chat',ChatController.getAll);
app.delete('/chat/:id',checkAuth,ChatController.remove);
app.patch('/chat/:id',checkAuth,ChatController.update);


 const PORT=process.env.PORT 
 app.listen(PORT || 4444,(err)=>{
if(err){
   return console.log(err)
}
console.log('Server ok')
 })
 //mongodb+srv://umedjonsharipov0005:umedumedumed1208@cluster0.hxghf6n.mongodb.net/blog?retryWrites=true&w=majority