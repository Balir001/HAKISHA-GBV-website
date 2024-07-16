// modeOfViolenceSeeder.js

// Import the ModeOfViolence model
const { ModeOfViolence } = require('../models');

// Define the data you want to insert
const modeOfViolenceData = [
  { Mode: 'Physical' },
  { Mode: 'Verbal' },
  { Mode: 'Sexual' },
  { Mode: 'Psychological' },
  { Mode: 'Stalking' },
  { Mode: 'Cyber Harassment' },
  { Mode: 'Traditional' },
  { Mode: 'Human Trafficking' },
  // Add more modes as needed
];

// Define the seeder function
async function seedModeOfViolence() {
  try {
    // Check if there are any existing records in the ModeOfViolence table
    const existingModes = await ModeOfViolence.findAll();

    // If there are no existing records, then perform bulk insertion
    if (existingModes.length === 0) {
      await ModeOfViolence.bulkCreate(modeOfViolenceData);
      console.log('Modes of violence seeded successfully.');
    } else {
      console.log('Modes of violence already exist. Skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding modes of violence:', error);
  }
}

// Export the seeder function
module.exports = seedModeOfViolence;
