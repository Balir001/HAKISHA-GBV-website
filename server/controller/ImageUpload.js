const multer = require('../middleware/multer'); // Import Multer middleware

const jwt = require('jsonwebtoken');
const { User, Profile } = require('../models'); // Assuming you have models for User and Profile

//uploadImage controller
module.exports = {
    UploadImage: async (req, res) => {
        try {
            const id = req.userId; // Assuming the user ID is part of the request parameters

            // Fetch user details along with associated profile
            const userDetails = await User.findByPk(id, {
                include: Profile // Include the Profile model to fetch associated profile
            });

            if (!userDetails) {
                return res.status(404).json({ error: 'User and profile not found, cannot upload file' });
            }

            // If there's no file uploaded, return an error
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // At this point, you can handle the file upload as needed
            // For example, you can save the file path to the user's profile
            userDetails.Profile.avatar = req.file.path;
            await userDetails.Profile.save();

            // Return success response
            res.status(200).json({ message: 'File uploaded successfully', userDetails });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
