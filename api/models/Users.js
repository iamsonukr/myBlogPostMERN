const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:String,
    password:String,
    profilePic:{
        type:String,
        default:"",
        required:false,
    },

},{timestamps:true})

module.exports=mongoose.model("Users",userSchema)
