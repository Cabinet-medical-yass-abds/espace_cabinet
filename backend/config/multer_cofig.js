const multer = require('multer')
const path = require('path')
// Set The Storage Engine

const storage = multer.diskStorage({
    destination: 'C:/Users/ALPHA/Desktop/cabinet/espace_patient/public/uploads/files',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
  })

module.exports = upload