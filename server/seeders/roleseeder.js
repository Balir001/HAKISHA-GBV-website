// roleSeeder.js

// Import the Role model
const { Role } = require('../models');

// Define the data you want to insert
const rolesData = [
  { Role: 'Super Manager' },
  { Role: 'Manager' },
  { Role: 'Counselor' },
  { Role: 'Support Seeker' },
  // Add more roles as needed
];

// Define the seeder function
async function seedRole() {
  try {
    // Check if there are any existing records in the Role table
    const existingRoles = await Role.findAll();

    // If there are no existing records, then perform bulk insertion
    if (existingRoles.length === 0) {
      await Role.bulkCreate(rolesData);
      console.log('Roles seeded successfully.');
    } else {
      console.log('Roles already exist. Skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
}

// Export the seeder function
module.exports = seedRole;
