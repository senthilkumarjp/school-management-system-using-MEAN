const express = require('express');
const multer = require('multer');

const Form = require('../models/form');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP ={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    const isValid =MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error,"backend/images");
  },
  filename:(req,file,cb) =>{
    const name =file.originalname.toLowerCase().split(' ').join('-');
    const ext =MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})

router.post("",checkAuth, multer({storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Form({
    name:req.body.name,
    description:req.body.description,
    age:req.body.age,
    imagePath:url + "/images/" + req.file.filename
  });
  post.save().then(result =>{
    res.status(201).json({
      message: "form added successfully!",
      post:{
        ...result,
      id:result._id,
      }
  });
  });
});

router.put("/:id", multer({storage}).single("image"),(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post =new Form({
    _id:req.body.id,
    name:req.body.name,
    description:req.body.description,
    age:req.body.age,
    imagePath:imagePath
  })
   Form.updateOne({_id:req.params.id}, post).then(result =>{
     res.status(200).json({message:'update successfully!'})
   })
})

router.get("", (req, res, next) => {
  Form.find().then(documents =>{
    res.status(200).json({ message: "forms fetched successfully!", posts: documents });
  })
});

router.get("/:id",(req,res,next)=>{
  Form.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({ message: 'post not found!'})
    }
  })
})

router.delete("/:id",checkAuth,(req,res,next)=>{
  Form.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:"post deleted!"})
  })
})

module.exports=router;
