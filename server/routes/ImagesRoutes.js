const express = require('express');
const { verifyToken } = require('../middleware/jwt');
const router = express.Router();
const { UploadImage } = require('../controller/ImageUpload');
const {upload} = require("../middleware/multer")



router.post('/', verifyToken, upload.single('image'), UploadImage);

module.exports = router;