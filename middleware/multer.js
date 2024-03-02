const multer = require('multer')

const storage = multer.memoryStorage();

const fileUpload = multer({ storage }).single('file')

module.exports = fileUpload;