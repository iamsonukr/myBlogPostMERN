const router=require('express').Router();
const User=require('../models/Users')
const bcrypt=require('bcrypt')

//REGISTER
router.post('/register',async(req,res)=>{
    try{
        // const salt=await bcrypt.genSalt(10)
        // const hashedPass=await bcrypt.hash(req.body.password,salt);
        const data=new User({
            username:req.body.username,
            email:req.body.email,
            // password:hashedPass,
            password:req.body.password,
            profilePic:req.body.profilePic,
        })
        console.log(data)
        const newUser=new User(data)
        const user=await newUser.save();
        res.status(200).json(user)
    }catch(err){
        res.sendStatus(500).json(err)
    }
})
//LOGIN

router.post('/login',async(req,res)=>{
    try{
        console.log("Tying to login")
        const user=await User.findOne({username:req.body.username})
        !user && res.status(400).json("Wrong username !")
        const pass=req.body.password
        const pass2=user.password
        
        // if(pass==pass2){
            const {password, ...other}=user._doc;
            res.status(200).json(other)
        // }
        // else{
        //     res.status(400).json("Wrong password !")
        // }
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/users',async(req,res)=>{
    const data=await User.find();
    res.status(200).send(data) 
})

module.exports=router