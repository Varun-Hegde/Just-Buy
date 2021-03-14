/* const path = require('path')
const express = require('express')
const multer = require('multer')
const router = express.Router()

//CONFIGURATION
const storage = multer.diskStorage({
  destination(req, file, cb) {
    //STORE IMAGE FILES IN uploads/ FOLDER
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})
//path.extname(file.originalname) gets the extension of file(Eg: .jpeg)

//MIDDLEWEAR
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  //allow only image files(jpg,jpeg,png) to be uploaded
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

module.exports = router */

  
const multer = require('multer')
const express = require('express')
const path = require('path')
const router = express.Router()
const {storage} = require('../cloudinary/index')


/* const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'uploads/')
    },
    filename(req,file,cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
}) */

function checkFileType(file,cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb('Images Only!')
    }
}

const upload =  multer({
    storage,
    fileFilter : function(req,file,cb) {
        checkFileType(file,cb)
    } 
}) 

router.post('/',upload.array('image'),(req,res) => {
    const filePath = []
    for (var i = 0; i < req.files.length; i++) {
        filePath.push(req.files[i].path)
    }
    console.log({filePath: filePath});
    res.json({filePath: filePath})
})



module.exports = router