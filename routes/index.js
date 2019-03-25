var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: 'uploads/', limits:{ fileSize:100000 }, });
var fs = require('fs-extra');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index');

});

router.post('/', upload.single('file'), function(req, res, next) {
  console.log("upload!!!");
  const { size } = req.file;
  console.log("up here!");
  res.json({ size });
  next();
  if(req.file){
      console.log("file is " +req.file.filename);
      fs.remove('./uploads/'+req.file.filename, err => {
        if(err) { console.log("Error"); }
        else { console.log(req.file.filename+" succesfully deleted. "); }
      });
     
  }else{
    console.log("else!!!!" +req.file);
  }
  console.log("down here!!")
  return;
});

module.exports = router;
