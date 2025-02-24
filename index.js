///app create
const express= require("express");
const app= express();

//port find krna h
require("dotenv").config();
const PORT= process.env.PORT || 3000;

// middleware add krna h
app.use(express.json());
const fileUpload=require("express-fileupload");

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 }  // 50 MB limit

  }));
  

//db se connect krna h
const db= require("./config/database");
db.connect();

// cloud se connect krna h
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount krna h
const Upload=require("./routes/Fileupload");
app.use('/api/v1/upload',Upload);

//activate server krna h
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})
