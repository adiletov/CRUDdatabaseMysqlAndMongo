const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const nanoid = require('nanoid');
const config = require('../config');
const mysqlDb = require('../mysqlDb');

const storage = multer.diskStorage({
   destination: (req,file,cb)=>{
       cb(null, config.uploadPath)
   },
   filename:(req,file,cb)=>{
       cb(null, nanoid() + path.extname(file.originalname))
   }
});


const upload = multer({storage});


router.post('/', upload.single('image'), async (req,res)=>{
    const newTest = {
        title: req.body.title,
        description: req.body.description,
    };
    if (req.file){
        newTest.image = req.file.filename
    }else{
        newTest.image = 'no image'
    }

    await mysqlDb.getConnection().query('INSERT INTO `posts` (`heading`, `description`, `image`, `date`) VALUES(?,?,?,?)',
        [newTest.title, newTest.description, newTest.image, new Date()]
        );
    res.send('ok')
});


router.get('/', async (req,res)=>{
    const test = await mysqlDb.getConnection().query('SELECT * FROM `posts`');
    res.send(test);
});


router.get('/:id', async (req,res)=>{
    const test = await mysqlDb.getConnection().query('SELECT * FROM `posts` WHERE `id`=?', req.params.id);
        res.send(test)
});

router.delete('/:id', async (req,res)=>{
    await mysqlDb.getConnection().query('DELETE FROM `posts` WHERE `id`=?', req.params.id);
    res.send('Delete')
});

router.put('/:id', upload.single('image') ,async (req,res)=>{
    const newTest = {
        title: req.body.title,
        description: req.body.description
    };
    if (req.file){
        newTest.image = req.file.filename
    }else{
        newTest.image = 'no image'
    }
    await mysqlDb.getConnection().query('UPDATE `posts` SET `heading` = ? , `description`=?, `image`=? , `date`=?  WHERE `id`=?',
        [newTest.title, newTest.description, newTest.image, new Date(), req.params.id]
        );
    res.send('update')
});



module.exports = router;