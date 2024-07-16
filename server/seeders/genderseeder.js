// genderSeeder.js

// Import the Gender model
const { Gender } = require('../models');

// Define the data you want to insert
const genderData = [
  { Gender: 'Male' },
  { Gender: 'Female' },
  { Gender: 'Other' },
  // Add more genders as needed
];

// Define the seeder function
async function seedGender() {
  try {
    // Check if there are any existing records in the Gender table
    const existingGenders = await Gender.findAll();

    // If there are no existing records, then perform bulk insertion
    if (existingGenders.length === 0) {
      await Gender.bulkCreate(genderData);
      console.log('Genders seeded successfully.');
    } else {
      console.log('Genders already exist. Skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding genders:', error);
  }
}

// Export the seeder function
module.exports = seedGender;
