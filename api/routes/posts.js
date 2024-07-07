const router=require('express').Router()
const User=require('../models/Users')
const bcrypt =require('bcrypt')
const Post=require('../models/Posts')
const Posts = require('../models/Posts')

//Create New Post
router.post('/', async (req, res) => {
    const newPost=new Post(req.body)
    try {
        const savePost= await newPost.save();
        res.status(200).json(savePost)
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update post 
router.put('/:id', async (req, res) => {
    try{
        const post=await Post.findById(req.params.id)
        if(post.username===req.body.username){
            try{
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true});
                res.status(200).json(updatedPost)
            }catch(err){
                res.status(401).json("You can only update your post !")
            }
        }
        else{
            res.status(401).json("You can update only your post !")
        }
    }catch(err){
        res.status(500).json(err)
    }
}) 

//DELETE POST
router.delete('/:id',async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post.username===req.body.username){
            try{
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("Post has been deleted ... ")
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("you can only delete you own post..")
        }
    }catch(err){
        res.status(500).json(err)
    }
})


router.get('/:id',async(req,res)=>{
    try{
        const data=await Post.findById(req.params.id)
        res.status(200).json(data)
    }catch(err){
        res.status(401).json("Data not found fuck off")
    }
})

router.get("/",async(req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Posts.find({username})
        }else if(catName){
            posts=await Posts.find({categories:{$in:[catName]}})
        }else{
            posts=await Post.find()
        }
        res.status(200).json(posts)
    }catch(err){
            res.status(500).json(err)
    }
}) 

module.exports=router