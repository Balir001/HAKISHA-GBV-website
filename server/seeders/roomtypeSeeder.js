// roomTypeSeeder.js

// Import the RoomType model
const { RoomType } = require('../models');

// Define the data you want to insert
const roomTypeData = [
  { RoomType: 'Direct Message' },
  { RoomType: 'Group Message' },

  // Add more room types as needed
];

// Define the seeder function
async function seedRoomType() {
  try {
    // Check if there are any existing records in the RoomType table
    const existingRoomTypes = await RoomType.findAll();

    // If there are no existing records, then perform bulk insertion
    if (existingRoomTypes.length === 0) {
      await RoomType.bulkCreate(roomTypeData);
      console.log('Room types seeded successfully.');
    } else {
      console.log('Room types already exist. Skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding room types:', error);
  }
}

// Export the seeder function
module.exports = seedRoomType;
