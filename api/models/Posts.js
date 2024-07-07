const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    title:String,
    desc:String,
    photo:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        require:true,
    }

},{timestamps:true})

module.exports=mongoose.model("Posts",postSchema)
