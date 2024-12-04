import express from 'express'
const authRouter=express.Router()

//REGISTER
authRouter("/register", registerUser)

//LOGIN
authRouter("/login", loginUser);

export default authRouter
