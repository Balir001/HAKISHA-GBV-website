// routes/locationRoute.js
const express = require("express");
const router = express.Router();
const { createIncident,
        fetchIncidents
 } = require('../controller/incidentController');
 const {verifyToken} = require("../middleware/jwt")

router.get("/list", async (req, res) => {
  // Handle GET request for incident list
  // You may want to implement the logic for retrieving the incident list here
});

router.post("/", (req, res, next) => {
  // Check if the Authorization header exists
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // If the Authorization header is missing, call createIncident directly
    return createIncident(req, res);
  }

  // If the Authorization header exists, proceed with verifyToken middleware
  verifyToken(req, res, next);
}, createIncident);


router.get("/fetchIncidents", fetchIncidents);

module.exports = router;
