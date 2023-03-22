const express = require('express')
const router = express.Router()
const multer = require('multer')

//multer
//membuat storage
const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null, './uploads')
    },
    filename: (req,file,callback)=>{
        callback(null, file.originalname)
    }
})
//atur multer menggunakan storage
const upload = multer({storage:storage})

router.post('/profile',upload.array('avatar'), (req,res)=>{
    res.send(req.file)
})

module.exports = router


