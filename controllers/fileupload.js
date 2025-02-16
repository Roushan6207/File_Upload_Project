const File=require("../models/File");

//loaclfileupload -> handler function

exports.localFileUpload= async (req,res) => {
    try{
   //fetch file from request..
   const file= req.files.file;

   console.log("FILE AAGYI HAI -> ",file);


   //create path where file need to be stored on server
   let path= __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
   console.log("PATH ->",path);


   //add path to the move function
   file.mv(path, (err) => {
    console.log(err);
   });
   

   //cretae a successful response..
   res.json({
    success:true,
    message:'Local File Uploaded Successfully',
   });

    }

    catch(error){
      console.log(error);
    }
}