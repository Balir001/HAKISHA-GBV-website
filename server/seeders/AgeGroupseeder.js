// ageGroupSeeder.js

// Import the AgeGroup model
const { AgeGroup } = require('../models');

// Define the data you want to insert
const ageGroupData = [
  { AgeGroup: 'Child' },
  { AgeGroup: 'Teenager' },
  { AgeGroup: 'Adult' },
  { AgeGroup: 'Elderly' },
  // Add more age groups as needed
];

// Define the seeder function
async function seedAgeGroup() {
  try {
    // Check if there are any existing records in the AgeGroup table
    const existingAgeGroups = await AgeGroup.findAll();

    // If there are no existing records, then perform bulk insertion
    if (existingAgeGroups.length === 0) {
      await AgeGroup.bulkCreate(ageGroupData);
      console.log('Age groups seeded successfully.');
    } else {
      console.log('Age groups already exist. Skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding age groups:', error);
  }
}

// Export the seeder function
module.exports = seedAgeGroup;
