const mongoose=require('mongoose')
const categotySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }

})

module.exports=mongoose.model('Category',categotySchema)