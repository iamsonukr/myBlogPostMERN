const express=require('express')
const app=express();
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const multer=require('multer')
const authRoute=require("./routes/auth")
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const categoryRoute=require('./routes/categories')
const path =require ("path")
const cors=require('cors');

app.use(cors());


// Enable CORS for localhost:3000
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

dotenv.config();
app.use(express.json() )
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/category',categoryRoute)

const connectDB=async(req,res)=>{
    // await mongoose.connect(process.env.MONGO_URL,{
    await mongoose.connect("mongodb+srv://sonukr:sonukr2@cluster0.sqymejd.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser:true,
    
    }).then(console.log("Database connected say hurry"))
    .catch(e=>console.log(e))
}

connectDB()
///--------- file upload ...-----
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images"); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); 
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

//  ------------ ROUTING START HERE ---------

app.listen(5000,()=>{
    console.log("App is running ")
})