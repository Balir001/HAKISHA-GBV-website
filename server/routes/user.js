const express = require("express");
const router = express.Router();
const {
  CreateUser,
  Login,
  deleteUserAccount,
  updatePassWord,
  sendPasswordOTP,
  createSuperManagerProfile,
  createProfile,
  GetProfile,
  GetUserDetails,
  ActivateUser,
  sendUserActivationToken,
  DeleteProfile,
  UpdateProfile,
  updateProfileWithRole,
  searchCasesByModeOfViolence,
  searchUserEmail,
  searchUsersByRole
  // createAvatar
  // getAvatar,
  // updateAvatar,
  // deleteAvatar
} = require("../controller/userController");
const { verifyToken } = require("../middleware/jwt");
const upload = require("../middleware/multer");


//Userdetails route
router.get("/UserDetails", verifyToken, GetUserDetails);

//createuser route
router.post("/", CreateUser);

//delete user
router.delete("/deleteAccount",verifyToken,deleteUserAccount)

//sendUserActivatOtp
router.get("/sendActivationOTP", verifyToken, sendUserActivationToken);

//activateuser
router.post("/userActivation", verifyToken, ActivateUser);

// Login route
router.post("/Login", Login);

// SuperManager Profile route 
router.post(
  "/createSuperManagerProfile",
  verifyToken,
  upload.single("avatar"),
  createSuperManagerProfile
);
///////////////////////////////////////////////////////
// Profile route
router.post(
  "/createProfile",
  verifyToken,
  upload.single("avatar"),
  createProfile
);

//GetProfile
router.get("/getProfile", verifyToken, GetProfile);

// UpdateProfile
router.put("/updateProfile",
  verifyToken,
  upload.single("avatar"),
  UpdateProfile
);

//GetUserby role
router.get("/getUserByRole", verifyToken, searchUsersByRole);



//super Manager route for assigning role,specialization,and organisation
router.put('/assignProfile', updateProfileWithRole);

//DeleteProfile
router.delete("/deleteProfile", verifyToken, DeleteProfile);

//search profiles
router.get("/search-profiles", verifyToken, searchCasesByModeOfViolence);

//send activation Password otp
router.post("/sendPasswordActivationOTP", sendPasswordOTP);

//reset password
router.put("/updatePassword", updatePassWord);

//search user by email
router.post("/searchUserByEmail", verifyToken, searchUserEmail);

// //create Avatar
// router.get("/Avatar",createAvatar);

// //get Avatar
// router.get("/Avatar",getAvatar);

// //Update Avatar
// router.get("/updateAvatar",updateAvatar);

// //Delete Avatar
// router.get("/deleteAvatar",deleteAvatar);

module.exports = router;
