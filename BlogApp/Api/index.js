const express = require('express');
const app = express();
const cors = require('cors')
const user = require('./models/model')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const salt = bcrypt.genSaltSync(10);
const cookieParser = require('cookie-parser')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config()
const pathh = require('path');
const fs = require('fs');
const Post = require('../Api/models/createPost')

app.use(cors({credentials:true,origin:'http://localhost:5173'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(pathh.join(__dirname,'uploads')));

mongoose.connect("mongodb+srv://myjavamobile:RzrGnd1D4pqBFuUV@cluster0.w5tr4.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0")



app.post('/Register',async (req,res)=>{
  const {username , password , verifyPassword} = req.body;

  try{
    const newUser = await user.create({
      username,
      password:bcrypt.hashSync(password,salt)
    })
    res.status(200).json('ok')
  } catch (e) {
    console.log(e);
    res.status(400).json('registration failed')
  }
})

app.post('/login',async (req,res)=>{
  const {username,password} = req.body;
  try{
    userFound = await user.findOne({username})
    if(!userFound){
      return res.status(401).json('user not found')
    }

    const passok = await bcrypt.compareSync(password,userFound.password);

    if(passok){
      console.log(process.env.SECRET_TOKEN_KEY);
      jwt.sign({username,id:userFound._id},process.env.SECRET_TOKEN_KEY,{},(err,token)=>{
        res.cookie('token',token,{
          httpOnly:true,
          maxAge:1000*60*60*24,
          secure:false,
          sameSite:'strict'
        }).status(200).json({
          id:userFound._id,
          username
        });
      })
    } else {
      res.status(400).json('wrong password/unauthorized')
    }

  } catch (e) {
    return res.status(400).json('user not found')
  }
})

app.get('/profile',(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token,process.env.SECRET_TOKEN_KEY,{},(err,info)=>{
    if (err) throw err;
    res.json(info)
  })
})

app.post('/logout',(req,res)=>{
  res.cookie('token', '').json('ok');
})

app.get('/posts',async (req,res)=>{
  const posts = await Post.find()
  .populate('author')
  .sort({createdAt:-1});
  res.json(posts)
})

app.post('/createPost',upload.single('files'),async (req,res)=>{

  const {token} = req.cookies;

  jwt.verify(token,process.env.SECRET_TOKEN_KEY,{},async (err,info)=>{
    if (err) throw err;
    const {originalname , path} = req.file;
    const ext = pathh.extname(originalname);
    const {title,content,summary} = req.body;
    const newPath = path + ext;
    fs.renameSync(path,newPath);
    const product = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author: info.id
    })
    return res.status(200).json(req.file);
  })
})

app.get('/posts/:id',async (req,res)=>{
  const {id} = req.params;
  const post = await Post.findById(id).populate('author',['username']);
  res.json(post);
})

app.put('/posts/:id',upload.single('files'),async (req,res)=>{
  const {id} = req.params;
  let newPath = null;
  if(req.file){
    const {originalname , path} = req.file;
    const ext = pathh.extname(originalname);
    newPath = path + ext;
    fs.renameSync(path,newPath);
  }
  const {title,content,summary} = req.body;
  const post = await Post.findById(id);
  if(newPath) post.cover = newPath;
  post.title = title;
  post.summary = summary;
  post.content = content;
  await post.save();
  res.status(200).json(post);
})

app.listen(4000, ()=>{
  console.log("server is working");
})

