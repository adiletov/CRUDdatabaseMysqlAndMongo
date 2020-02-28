const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const config = require('../config');
const nanoid = require('nanoid');
const Test = require('../modules/test');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, config.uploadPath)
    },
    filename: (req,file,cb)=>{
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req,res)=>{
    const test = await Test.find();
    res.send(test)
});

router.post('/', upload.single('image'),async (req,res)=>{
    const newTest = {
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename
    };
    const result = new Test(newTest);
    try{
       await result.save()
    }catch (e) {
        console.error(e)
    }
    res.send(result._id)
});

router.get('/:id', async (req,res)=>{
    const test = await Test.findOne({_id: req.params.id});
    res.send(test)
});

router.delete('/:id', async (req,res)=>{
   await Test.deleteOne({_id: req.params.id})
    res.send('DElete')
});

router.put('/:id', upload.single('image'), async (req,res)=>{
    const newTest = {
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename
    };
        await Test.updateOne({_id: req.params.id}, {$set: newTest});
    res.send("ok")
});

module.exports = router;