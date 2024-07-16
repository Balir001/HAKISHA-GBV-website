const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/jwt")

const { 
    ModeOfViolence,
    AgeGroup, 
    Organization,
     Role,
     gender,
     Specialization,
     getModeOfViolence,
     getAgeGroup,
     getOrganization,
     getRole,
     getGender,
     getSpecialization,
     deleteModeOfViolence,
     deleteAgeGroup,
     deleteOrganization,
     deleteRole,
     updateModeOfViolence,
     updateAgeGroup,
     updateOrganization,
     updateRole,
     

    } = require('../controller/GeneralDataController');


// Violence Mode Entry route
router.post("/ModeOfViolence",verifyToken,ModeOfViolence );

// Age Group route
router.post("/ageGroup",verifyToken, AgeGroup);

// Enter Organisation route
router.post("/Organization",verifyToken,Organization );

//Enter Specialization
router.post("/Specialization",verifyToken,Specialization );


// Entyr of Roles route
router.post("/Role",verifyToken,Role );

// Gender route
router.post("/gender",gender);



                    //Get routes
// Violence Mode route
router.get("/getModeOfViolence",getModeOfViolence );

// Age Group route
router.get("/getAgeGroup",getAgeGroup);

// Organisation route
router.get("/getOrganization",getOrganization );

// Roles route
router.get("/getRole",getRole );

// Roles route
router.get("/getGender",getGender );

//Enter Specialization
router.get("/getspecialization",getSpecialization);





              //delete routes
// Violence Mode route
router.delete("/deleteModeOfViolence/:id",verifyToken,deleteModeOfViolence );

// Age Group route
router.delete("/deleteAgeGroup/:id",verifyToken,deleteAgeGroup);

// Organisation route
router.delete("/deleteOrganization:id", verifyToken,deleteOrganization );

// Roles route
router.delete("/deleteRole/:id",verifyToken,deleteRole );



              //Update routes
// Violence Mode route
router.put("/updateModeOfViolence",verifyToken,updateModeOfViolence );

// Age Group route
router.put("/updateAgeGroup",verifyToken,updateAgeGroup);

// Organisation route
router.put("/updateOrganization", verifyToken,updateOrganization );

// Roles route
router.put("/updateRole",verifyToken,updateRole );




module.exports = router;
