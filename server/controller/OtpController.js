const { UserOTP, User } = require("../models");

const HandleOtp = async (userId, otp) => {
    try {
        // Check if there is an existing OTP record for the user
        const existingOTP = await UserOTP.findOne({ where: { User_Id: userId } });
        if (existingOTP) {
           // If an existing OTP is found, return an error message
           return "An OTP already exists for this user";
        }

        // If no existing OTP is found, create a new OTP record for the user
        await UserOTP.create({
            User_Id: userId,
            otp: otp,
        });
    } catch (error) {
        console.error("Error handling OTP:", error);
        // Handle the error appropriately, e.g., return an error response
        throw new Error("Failed to handle OTP");
    }
};

module.exports = { HandleOtp };
