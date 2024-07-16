const { verifyToken } = require('../middleware/jwt');
const express = require("express");
const router = express.Router();
const{
    AgeGroupPie,
    GenderPie,
    ModeOfViolencePie,
    countIncidentsByAgeGroupAndModeOfViolence,
    countIncidentsByGenderAndAgeGroup

}=require("../controller/pieChartControllers")


// agegroup pie
router.get("/getAgeGroupPie",AgeGroupPie );

// genderpie
router.get("/getGender",GenderPie);

// modeofviolence pie
router.get("/getModeOfViolencePie",ModeOfViolencePie);

// advancedanalysis
router.get("/getadvancedanalysis",countIncidentsByAgeGroupAndModeOfViolence );

// advancedanalysis1
 router.get("/getadvancedanalysisone",countIncidentsByGenderAndAgeGroup);

module.exports = router;