const multer = require('multer');

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/Profiles'); // Specify the directory where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    },
});

// Create multer instance with storage configuration
const upload = multer({ storage });

module.exports = upload;