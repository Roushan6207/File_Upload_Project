const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

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



function isFileTypeSupported(type,supportedTypes){
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder){
  const options= {folder};
  console.log("temp file path", file.tempFilePath);
  return await cloudinary.uploader.upload(file,tempFilePath,options);
}

//image upload  ka handler..
exports.imageUpload= async (req,res)  => {
  try{
    
    //data fetch
    const {name,tags,email}= req.body;
    console.log(name,tags,email);

    const file= req.files.imageFile;
    console.log(file);
   
    // validation...
    const supportedTypes=("jpg","jpeg","png");
    const fileType= file.name.split('.')[1].toLowerCase();
    console.log("file TYpe:",fileType);

    if(!isFileTypeSupported(fileType,supportedTypes)){

      return res.status(400).json({
        success:false,
        message:'File Format not supported',
      })

    }

    //file format supported h ...

    console.log("cloudinary aa gye h");

    const response=await uploadFileToCloudinary(file,"Codehelp");
    console.log(response);

   //db me entry save krna h..
  //  const  fileData= await File.create ({
  //   name,
  //   tags,
  //   email,
  //   imageUrl
  //  })

  res.json({
    success:true,
    message:'Image Successfully Uploaded',
  });

  }

  catch(error){
  
    console.log(error);
    res.status(400).json({
      success:false,
      message:'Something Went Wrong',
    });

  }

}