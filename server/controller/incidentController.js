const { User, Incident } = require("../models");
const { v5: uuidv5 } = require('uuid');

// Incident creation
module.exports = {
  createIncident:async (req, res) => {
    const { latitude, longitude, description, violenceMode, ageGroup, gender } = req.body;
    try {
      let userId;
      if (req.userId) {
        // If userId is available from the JWT, use it
        userId = req.userId;
      } else {
        // If userId is not available, use the default user ID
        const NAMESPACE = process.env.NAMESPACE;
        const ANONYMOUSIDENTIFIER = process.env.ANONYMOUSIDENTIFIER;
        userId = uuidv5(ANONYMOUSIDENTIFIER, NAMESPACE);
      }
  
      const createdIncident = await Incident.create({
        latitude,
        longitude,
        gender_Id: gender,
        description,
        User_Id: userId,
        Mode_Id: violenceMode,
        Victim_Id: ageGroup,
      });
      res.json(createdIncident);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  fetchIncidents:async (req, res) => {
    try {
        // Fetching all incidents from the database
        const incidents = await Incident.findAll();

        res.json( incidents ); // Sending the incidents as JSON response
    } catch (error) {
        console.error('Error fetching incidents:', error);
        res.status(500).json({ error: 'Internal server error' }); // Sending an error response
    }
}
};
