const { v5: uuidv5 } = require('uuid');
require('dotenv').config();

const seedUsers = async (sequelize) => {
// Import the user model
const { User } = require('../models');
  // Import the profile model
const { Profile } = require('../models');


  try {
    // Check if the users already exist
    const [anonymousUser, superManager] = await Promise.all([
      User.findOne({ where: { Email: process.env.ANONYMOUSEMAIL } }),
      User.findOne({ where: { Email: process.env.SUPERMANAGEREMAIL } }),
    ]);

    if (!anonymousUser && !superManager) {
      // If users don't exist, create them
      const NAMESPACE = process.env.NAMESPACE;
      const ANONYMOUSIDENTIFIER = process.env.ANONYMOUSIDENTIFIER;
      
      const NAMESPACE1 = process.env.NAMESPACE1;
      const SUPERMANAGERIDENTIFIER = process.env.SUPERMANAGERIDENTIFIER;


      const anonymousUserId = uuidv5(ANONYMOUSIDENTIFIER, NAMESPACE);
      const superManagerId = uuidv5( SUPERMANAGERIDENTIFIER, NAMESPACE1);
     

      const [createdAnonymousUser, createdSuperManager] = await Promise.all([
        User.create({
          id: anonymousUserId,
          Email: process.env.ANONYMOUSEMAIL,
          Password: process.env.ANONYMOUS_USER_PASSWORD,
          Is_Active: true,
        }),
        User.create({
          id: superManagerId,
          Email: process.env.SUPERMANAGEREMAIL ,
          Password: process.env.SUPER_MANAGER_PASSWORD,
          Is_Active: true,
        }),
      ]);

      // Create a profile for the superManager
      
      const randomPhoneNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generate a random 10-digit phone number

      await Profile.create({
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: new Date(), // You can set a specific date here
        gender_Id: 1, // Assuming the gender ID for Male is 1
        middleName: "Middle",
        TypeOfRole: process.env.SEEDINGSUPERMANAGERROLE,
        phoneNumber: randomPhoneNumber,
        User_Id: superManagerId,
        
      });

      console.log("Users seeded successfully");
    } else {
      console.log("Users already exist");
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

module.exports = seedUsers;