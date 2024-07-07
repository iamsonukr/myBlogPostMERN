const router=require('express').Router()
const User=require('../models/Users')
const bcrypt =require('bcrypt')
const Post=require('../models/Posts')

//update
router.put('/:id',async(req,res)=>{
    if(5==5){
        
        console.log(req.params.id)
        console.log(req.body.id)
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }
        try{
            const updateUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            })
            res.status(200).json("User updated")
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        console.log(req.params.id)
        console.log(req.body.id)
        res.status(401).json("You can update only your account !")
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    if (req.body.id === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User Deleted")
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User Not found")
        }
    } else {
        res.status(401).json("You can update only your account !")
    }
})

//GET USER
router.get('/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...others}=user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router