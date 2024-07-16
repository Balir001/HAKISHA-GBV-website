const jwt = require('jsonwebtoken');
const { User,Profile,ModeOfViolence,Incident,Role,Organization,Specialization,Gender,UserOTP} = require("../models");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const { sendEmail, generateOTP } = require("./SendActivationTokenController");
const { UUID } = require("sequelize");
const { Op } = require('sequelize');
const {sequelize} = require("sequelize");
const  {HandleOtp} = require('./OtpController');







module.exports={

 // CreateUser function
CreateUser: async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
      return res.status(400).json({ error: "No valid email provided" });
  }

  try {
      const existingUser = await User.findOne({ where: { Email: email } });

      if (existingUser) {
          return res.status(409).json({ error: "Email already exists" });
      }

     

      // const hashedPassword = await bcrypt.hash(password, 10);

      // Create user with email, hashed password, and activation token
      const newUser = await User.create({
          Email: email,
          Password:password,
         // Adjust the field name according to your User model
      });

      const userId=newUser.id
    

      res.json("success");
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
},

deleteUserAccount:async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have the user's ID in req.user.id

    // Find the user
    const user = await User.findByPk(userId, {
      include: [Profile],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has a profile
    const profile = user.Profile;
    if (profile) {
      // First, delete the profile
      await profile.destroy();
    }

    // Then, delete the user
    await user.destroy();

    return res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
},


sendUserActivationToken: async (req, res) => {
  try {
      const userId = req.userId;

      // Check if the user exists
      const user = await User.findOne({ 
          where: { id: userId }, 
          include: { model: UserOTP } 
      });

      if (!user) {
          return res.status(404).json({ error: "User does not exist" });
      }

      // Check if the user already has an OTP
      if (user.UserOTP) {
          return res.status(400).json({ error: "OTP sent Please check your email to confirm" });
      }

      const email = user.Email;

      // Generate activation token
      const { success, otp } = generateOTP();

      if (!success) {
          return res.status(500).json({ error: "Failed to generate activation token" });
      }

      // Pass the user ID and activation token to HandleOtp function
      await HandleOtp(userId, otp);

      // Send activation email
      // For account activation
      const subject="Activation Email"
      const message="Your activation email is"
        await sendEmail(email, otp,subject,message);

      res.status(200).json("Success");
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
},

//activateUser
ActivateUser: async (req, res) => {
  const { otp } = req.body;
  console.log(`the sent otp in front end is ${otp}`);

  if (otp === undefined || otp === null) {
    return res.status(400).json({ error: " null" });
  }

  try {
    // Extract user ID from request object
    const userId = req.userId;

    // Find the OTP record for the user
    const userOTP = await UserOTP.findOne({ where: { User_Id: userId } });

    if (!userOTP) {
      return res.status(404).json({ error: "Invalid OTP" });
    }

    // Check if provided OTP matches the OTP stored in the database
    if (otp !== userOTP.otp) {
      // Increment attempts count
      userOTP.attempts += 1;
      await userOTP.save();

      // Check if attempts count reached three
      if (userOTP.attempts >= 3) {
        // Destroy OTP record
        await UserOTP.destroy({ where: { User_Id: userId } });
      }

      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Activate user's account
    await User.update({ Is_Active: true }, { where: { id: userId } });

    // Delete OTP record
    await UserOTP.destroy({ where: { User_Id: userId } });

    return res.json("Activation and profile creation successful");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
},




//Login
Login: async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { Email: email } });

    if (!user) {
      return res.status(404).json({ error: "Email does not exist" });
    }

    bcrypt.compare(password, user.Password).then((match) => {
      if (!match) {
        return res.status(401).json({ error: "Wrong password and email combination" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time (e.g., 1 hour)
      });

      // Send the token and a success message as a JSON response
      res.json({ message: "Login successful", token });
    });
  } catch (error) {
    // Log the error to the console or your logging system
    console.error("Login error:", error);

    // Send a generic error message to the frontend
    res.status(500).json({ error: "An error occurred during login" });
  }
},

sendPasswordOTP:async(req,res)=>{

  
    try{
      const{email}= req.body
          console.log(email)
      if (!email) {
        return res.status(404).json({ error: "Email value missing" });
      }
      
      const user = await User.findOne({
        where: { Email: email },
        include: [{ model: UserOTP }]
      });
      console.log(user)

      if (!user) {
        return res.status(404).json({ error: "User does not exist" });
      }

      // Check if the user already has an OTP
      if (user.UserOTP) {
        return res.status(200).json("OTP sent Please check your email to confirm");
    }

       // Generate activation token
       const { success, otp } = generateOTP();

       if (!success) {
        return res.status(500).json({ error: "Failed to generate activation token" });

      }
       
      const userId = user.id;
       console.log(userId)
     // Pass the user ID and activation token to HandleOtp function
     await HandleOtp(userId, otp);

        
      // For password reset
      
      const subject ="Password Reset:"
      const message ='Your password Reset OTP is'
      sendEmail(email, otp, subject, message);

      res.status(200).json("Success");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
},


updatePassWord: async (req, res) => {
  try {
    const { otp, password } = req.body;
    console.log( `the password is${password}`)
    if (otp === undefined || otp === null) {
      return res.status(400).json({ error: "OTP is null" });
    }

    const userOTP = await UserOTP.findOne({
      where: { otp: otp },
      include: User
    });

    if (!userOTP.User) {
      return res.status(404).json({ error: "Invalid OTP" });
    }

    // Check if provided OTP matches the OTP stored in the database
    if (otp !== userOTP.otp) {
      // Increment attempts count
      userOTP.attempts += 1;
      await userOTP.save();

      // Check if attempts count reached three
      if (userOTP.attempts >= 3) {
        // Destroy OTP record
        await UserOTP.destroy({ where: { User_Id: userId } });
      }

      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Update the user password
    const userId = userOTP.User_Id; // Assuming User_Id is the foreign key linking UserOTP to User
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's password
    user.Password = password; // Assuming password is the field to update
    user.update({ Password: password }, { where: { id: userId } });

    

    // Return success response
    return res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},




// Assuming GetUserDetails is defined elsewhere
GetUserDetails: async (req, res) => {
  try {
    const id = req.userId; // Assuming the user ID is part of the request parameters

    // Fetch user details along with associated profile
    const user = await User.findByPk(id, {
      include: [
        {
          model: Profile,
          include: [Role] // Include the Role model to fetch associated role
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

//Create Super Manager
createSuperManagerProfile:async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, middleName, phoneNumber, Organisation_Id } = req.body;
    const userId = req.userId;
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    // Check if the email exists in the User table and is active
    const user = await User.findOne({ where: { id: userId, Is_Active: true } });
    if (!user) {
      return res.status(400).json("User account not active or does not exist. Please activate or register");
    }

    // Check if profile already exists for the user
    const existingProfile = await Profile.findOne({ where: { User_Id: user.id } });
    if (existingProfile) {
      return res.status(400).json("Profile already exists for this user");
    }

    // Get the file path from req.file (assuming you used upload.single('avatar') middleware)
    const avatarPath = req.file ? req.file.path : null;
    console.log(avatarPath)

    // Create profile with the avatar path
    const profile = await Profile.create({
      User_Id: user.id,
      TypeOfRole: 1,
      firstName,
      lastName,
      dateOfBirth,
      gender_Id:gender,
      avatar: avatarPath, // Store the file path in the avatar field
      middleName,
      phoneNumber,
      Organisation_Id,
    });

    res.status(200).json("Profile created successfully");
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Profile creation failed" });
  }
},


 //Profile
 
createProfile:async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, middleName, phoneNumber, Organisation_Id } = req.body;
    const userId = req.userId;
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    // Check if the email exists in the User table and is active
    const user = await User.findOne({ where: { id: userId, Is_Active: true } });
    if (!user) {
      return res.status(400).json("User account not active or does not exist. Please activate or register");
    }

    // Check if profile already exists for the user
    const existingProfile = await Profile.findOne({ where: { User_Id: user.id } });
    if (existingProfile) {
      return res.status(400).json("Profile already exists for this user");
    }

    // Get the file path from req.file (assuming you used upload.single('avatar') middleware)
    const avatarPath = req.file ? req.file.path : null;
    console.log(avatarPath)

    // Create profile with the avatar path
    const profile = await Profile.create({
      User_Id: user.id,
      TypeOfRole: process.env.DEFAULTROLE,
      firstName,
      lastName,
      dateOfBirth,
      gender_Id:gender,
      avatar: avatarPath, // Store the file path in the avatar field
      middleName,
      phoneNumber,
      Organisation_Id,
    });

    res.status(200).json("Profile created successfully");
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Profile creation failed" });
  }
},
 


 //GetProfile
 GetProfile: async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({
      where: { id: userId, Is_Active: true },
      include: [
        {
          model: Profile,
          include: [
            {
              model: Role,
              required: true,
            },
            {
              model: Organization,
            },
            {
              model: Specialization,
            },
            {
              model: Gender,
            },
          ],
        },
      ],
    });

    if (!user) {
      res.json({ message: 'User account inactive.' });
    } else {
      if (user.Profile) {
        // User has a profile
        const profile = user.Profile.toJSON();

        // Construct the full URL or file path for the avatar
        const baseUrl = 'http://localhost:3001';
        const avatarUrl = profile.avatar ? `${baseUrl}/${profile.avatar}` : null;
        profile.avatar = avatarUrl;

        res.json(profile);
        console.log("User active");
      } else {
        // User has no profile
        res.json({ message: 'User account active but no profile found.' });
        console.log("User active but no profile found");
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
},
  // DeleteProfile
DeleteProfile: async (req, res) => {
  try {
    const userId = req.userId; // Use req.query.email to get the email from the query parameters

    // Check if the user exists
    const user = await User.findOne({ where: { id: userId } });

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the profile corresponding to the user
    const deletedCount = await Profile.destroy({ where: { User_Id: user.id } });

    // If no profile was deleted, return 404
    if (deletedCount === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
},

// UpdateProfile
UpdateProfile: async (req, res) => {
  try {
    const { 
      firstName, 
      lastName,
      middleName, 
      gender, 
      dateOfBirth,
      phoneNumber,
      organisationId,
      typeOfRole,
      specialization
    } = req.body;
    const userId = req.userId;

   
// Get the file path from req.file (assuming you used upload.single('avatar') middleware)
    const avatarPath = req.file ? req.file.path : null;
    console.log(avatarPath)
     
    console.log(userId)
    // Update the profile corresponding to the user
    const [updatedCount] = await Profile.update({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender_Id: gender,
      avatar: avatarPath, // Store the file path in the avatar field
      middleName: middleName,
      TypeOfRole: typeOfRole, // Make sure this variable is defined somewhere
      phoneNumber: phoneNumber,
      Organization_Id: organisationId, // Make sure this variable is defined somewhere
      Specialization_Id: specialization, // Make sure this variable is defined somewhere
    }, {
      where: { User_Id: userId },
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Profile not found for the user" });
    }

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
},

searchUsersByRole: async (req, res) => {
  const userId = req.userId;
  // Check if the user exists
  const user = await User.findOne({
    where: { id: userId },
    include: { model: Profile }
  });

  if (!user.Profile.typeOfRole === process.env.MANAGERROLEID) {
    return res.status(403).json("Operation Forbidden");
  }

  try {
    const roleId = req.query.roleId;
    // Assuming the role ID is sent from the frontend
    console.log(roleId);
    // Find the role by its ID
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Find all users with the specified role, including their profile, role, and gender data
    const users = await User.findAll({
      include: [
        {
          model: Profile,
          where: { TypeOfRole: roleId },
          include: [
            {
              model: Role,
              attributes: ['Role'], // Include the role name
            },
            {
              model: Gender, // Include the gender model
            },
          ],
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
},

updateProfileWithRole:async (req, res) => {
  try {
    const { email, organizationId, specializationId, roleId } = req.body;

    // Check if at least one value is provided
    if (!organizationId && !specializationId && !roleId) {
      return res.status(400).json({ message: 'No value provided for update' });
    }

    // Find the user and their profile based on the email
    const user = await User.findOne({
      where: { Email: email },
      include: [
        {
          model: Profile,
          as: 'Profile',
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateData = {};

    // Add fields to the updateData object only if they have a value
    if (organizationId) updateData.Organization_Id = organizationId;
    if (specializationId) updateData.Specialization_Id = specializationId;
    if (roleId) updateData.TypeOfRole = roleId;

    // Update the profile with the new organization, specialization, and role
    const updatedProfile = await user.Profile.update(updateData);

    return res.status(200).json(
      'Profile updated successfully'
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
},

searchCasesByModeOfViolence: async (req, res) => {
  const mode = req.query.mode;
  const userId = req.userId;
  console.log(userId);

  try {
    if (!mode || mode.trim() === '') {
      console.log('Mode is not provided');
      return res.status(200).json({ suggestion: 'Please select a case you are interested in' });
    }

    let counselor;
    if (userId) {
      counselor = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Profile,
            include: [
              {
                model: Role,
                attributes: ['Role'],
              },
              {
                model: Gender, // Include the Gender model
                attributes: ['Gender'], // Include the 'Gender' attribute from the Gender model
              },
            ],
          },
        ],
      });

      if (!counselor) {
        console.warn('Counselor not found for userId:', userId);
        return res.status(404).json({ error: 'Counselor not found' });
      }
    } else {
      console.warn('userId is undefined or invalid');
      return res.status(400).json({ error: 'Invalid userId' });
    }

    // Access the role and gender of the user
    const userRole = counselor.Profile.Role.Role;
    const userGender = counselor.Profile.Gender.Gender;
    console.log('User role:', userRole);
    console.log('User gender:', userGender);

    let whereCondition;
    if (mode && mode.trim() !== '') {
      // If mode is provided, search with the specified mode
      whereCondition = {
        Mode: { [Op.like]: `%${mode}%` },
      };
    }

    // If neither mode nor role is provided, whereCondition will remain undefined
    const profiles = await Profile.findAll({
      include: [
        {
          model: User,
          required: true,
          include: [
            {
              model: Incident,
              required: true,
              include: [
                {
                  model: ModeOfViolence,
                  where: whereCondition, // Use the defined whereCondition
                  required: true,
                },
              ],
            },
          ],
        },
        {
          model: Gender, // Include the Gender model
          attributes: ['Gender'], // Include the 'Gender' attribute from the Gender model
        },
      ],
    });

    // Send profiles to frontend or handle them as required
    res.json(profiles);
  } catch (error) {
    console.error('Error searching profiles:', error);
    return res.status(500).json({ error: 'An error occurred while searching profiles.' });
  }
},

searchUserEmail: async (req, res) => {
  try {
    // Extract user ID from request if needed
    const userId = req.userId;
    const email = req.body.email;

    // Assuming email is in the body of the request
    if (!email) {
      return res.status(400).json("Email not available");
    }

    const user = await User.findOne({
      where: { Email: email },
      include: [
        {
          model: Profile,
          include: [
            { model: Role, attributes: ['Role'] },
            { model: Gender, attributes: ['Gender'] },
            { model: Specialization, attributes: ['type'] },
            { model: Organization, attributes: ['Name'] },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(400).json("User and Profile not existing");
    }

    // Send the user object as response
    return res.json(user);
  } catch (error) {
    console.error("Error searching user by email:", error);
    return res.status(500).json("Internal Server Error");
  }
},



searchUserByRole:async(req,res)=>{
  try {
    const userId = req.userId; //extracted the userId from the JWT
    const roleId = req.body.roleId; // Assuming you're receiving the roleId from the frontend

    const users = await User.findAll({
      where: { id: userId },
      include: [
        {
          model: Profile,
          include: [
            {
              model: Role,
              where: { id: roleId }, // Filter profiles by the provided roleId
              attributes: ['Role'] // Specify the attributes you want from the Role model
            }
          ]
        }
      ]
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

}


