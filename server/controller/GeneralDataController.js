const { AgeGroup, ModeOfViolence, Organization, Role,User,Profile ,Gender,Specialization} = require("../models");

module.exports = {
  
ModeOfViolence: async (req, res) => {
  const { mode } = req.body;
  console.log(mode)
  const userId = req.userId; // Assuming userId is passed in the query

  if(!mode){
    return res.status(400).json("ModeOfViolence not provided")
  }

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role ===process.env.DEFAULTSUPERMANAGERROLE;

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with creating ModeOfViolence instance
      const createdInstance = await ModeOfViolence.create({
          Mode: mode,
      });

      res.status(200).json("Suceeded adding the ModeOfViolence");
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},

AgeGroup: async (req, res) => {
  const { ageGroup } = req.body;
  const userId = req.userId; // Assuming userId is passed in the query

  if(!ageGroup){
    return res.status(400).json("AgeGroup not provided")
  }

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role === 'Super Manager';

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with creating AgeGroup instance
      const createdInstance = await AgeGroup.create({
          AgeGroup: ageGroup,
      });

      res.status(200).json("Suceeded adding the AgeGroup");
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},

Organization: async (req, res) => {
  const { organizationName } = req.body;
  const userId = req.userId; // Assuming userId is passed in the query

  if(!organizationName){
    return res.status(400).json("Organization name not provided")
  }

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role === process.env.DEFAULTSUPERMANAGERROLE;

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with creating Organization instance
      const createdInstance = await Organization.create({
          Name: organizationName,
      });

      res.status(200).json("Suceeded adding the Organisation");
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},

Specialization: async (req, res) => {
    const { specialization} = req.body;
    const userId = req.userId; // Assuming userId is passed in the query

    if(!specialization){
        return res.status(400).json("Specialization not provided")
      }
  
    try {
        // Fetch user details along with associated profile and role
        const userDetails = await User.findByPk(userId, {
            include: [{
                model: Profile,
                include: Role // Include the Role associated with Profile
            }]
        });
  
        if (!userDetails) {
            return res.status(404).json({ error: "User not found" });
        }
  
        // Check if the user has the role of "manager"
        const isManager = userDetails.Profile.Role.Role === process.env.DEFAULTSUPERMANAGERROLE;
  
        if (!isManager) {
            return res.status(403).json({ error: "User does not have the required permissions" });
        }
  
        // If user is a manager, proceed with creating Specialisation instance
        const createdInstance = await Specialization.create({
            type: specialization,
        });
  
        res.status(200).json("Suceeded adding the Specialization");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  },

Role: async (req, res) => {
  const { role } = req.body;
  console.log(role)
  // const userId = req.userId; // Assuming userId is passed in the query

  if(!role){
    return res.status(400).json("Role not provided")
  }
    const userId=req.query
  try {
      //Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isSuperManager = userDetails.Profile.Role.Role === process.env.DEFAULTSUPERMANAGERROLE;

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

    //If user is a manager, proceed with creating Role instance
      const createdInstance = await Role.create({
          Role: role,
      });

      res.status(200).json("Suceeded adding the Role");
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},

gender:async(req, res)=> {
    try {
        const { gender } = req.body;
// Fetch user details along with associated profile and role
const userDetails = await User.findByPk(userId, {
    include: [{
        model: Profile,
        include: Role // Include the Role associated with Profile
    }]
});

if (!userDetails) {
    return res.status(404).json({ error: "User not found" });
}

// Check if the user has the role of "manager"
const isManager = userDetails.Profile.Role.Role === process.env.DEFAULTSUPERMANAGERROLE;

if (!isManager) {
    return res.status(403).json({ error: "User does not have the required permissions" });
}


        if(!gender){
          return res.status(400).json("Gender not provided")
        }
        const newGender = await Gender.create({ 
            Gender:gender});
            res.status(200).json("Suceeded adding the Gender");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},

  getModeOfViolence:async (req, res) => {
    try {
        // Fetch all ModeOfViolence records from the database
        const mode = await ModeOfViolence.findAll();

        // Return the fetched ModeOfViolence records
        res.status(200).json(mode);
    } catch (error) {
        console.error("Error fetching ModeOfViolences:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
},

  getAgeGroup: async (req, res) => {
    try {
        // Fetch all AgeGroup records from the database
        const group = await AgeGroup.findAll();

        // Return the fetched AgeGroup records
        res.status(200).json(group);
    } catch (error) {
        console.error("Error fetching AgeGroups:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
},

getOrganization: async (req, res) => {
    try {
        // Fetch all organizations from the database
        const organizations = await Organization.findAll();

        // If there are no organizations found, send a 404 response
        if (!organizations || organizations.length === 0) {
            return res.status(404).json({ message: 'No organizations found' });
        }

        // If organizations are found, send them in the response
        res.status(200).json({ organizations });
    } catch (error) {
        // If an error occurs during the database query, send a 500 response
        console.error('Error fetching organizations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
},

getRole: async (req, res) => {
    try {
        // Fetch all roles from the database
        const roles = await Role.findAll();

        // If there are no roles found, send a 404 response
        if (!roles || roles.length === 0) {
            return res.status(404).json({ message: 'No roles found' });
        }

        // If roles are found, send them in the response
        res.status(200).json({ roles });
    } catch (error) {
        // If an error occurs during the database query, send a 500 response
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
},

  getGender:async(req,res)=>{

    try {
        // Fetch all AgeGroup records from the database
        const gender = await Gender.findAll();

        // Return the fetched AgeGroup records
        res.status(200).json(gender);
    } catch (error) {
        console.error("Error fetching AgeGroups:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

  },

  getSpecialization: async (req, res) => {
    try {
        // Fetch all specializations from the database
        const specializations = await Specialization.findAll();

        // If there are no specializations found, send a 404 response
        if (!specializations || specializations.length === 0) {
            return res.status(404).json({ message: 'No specializations found' });
        }

        // If specializations are found, send them in the response
        res.status(200).json({ specializations });
    } catch (error) {
        // If an error occurs during the database query, send a 500 response
        console.error('Error fetching specializations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }},
    



  deleteModeOfViolence:async (req, res) => {
    const { id } = req.params;
    const userId = req.userId; // Assuming userId is passed in the query

    try {
        // Fetch user details along with associated profile and role
        const userDetails = await User.findByPk(userId, {
            include: [{
                model: Profile,
                include: Role // Include the Role associated with Profile
            }]
        });

        if (!userDetails) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user has the role of "manager"
        const isManager = userDetails.Profile.Role.Role === 'Manager';

        if (!isManager) {
            return res.status(403).json({ error: "User does not have the required permissions" });
        }

        // If user is a manager, proceed with deleting ModeOfViolence instance
        await ModeOfViolence.destroy({
            where: {
                id: id
            }
        });

        res.json({ message: "ModeOfViolence deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},



deleteAgeGroup:async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // Assuming userId is passed in the query

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role === 'Manager';

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with deleting AgeGroup instance
      await AgeGroup.destroy({
          where: {
              id: id
          }
      });

      res.json({ message: "AgeGroup deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},

deleteOrganization:async (req, res) => {
  const { id } = req.params;
  const userId = req.query.userId; // Assuming userId is passed in the query

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role === 'Manager';

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with deleting Organization instance
      await Organization.destroy({
          where: {
              id: id
          }
      });

      res.json({ message: "Organization deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},
deleteRole:async (req, res) => {
  const { id } = req.params;
  const userId = req.query.userId; // Assuming userId is passed in the query

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role === 'Manager';

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with deleting Role instance
      await Role.destroy({
          where: {
              id: id
          }
      });

      res.json({ message: "Role deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},



updateModeOfViolence:async (req, res) => {
  const { id } = req.params;
  const { violenceMode } = req.body;
  const userId = req.userId; // Assuming userId is passed in the query

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role === 'Manager';

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with updating ModeOfViolence instance
      await ModeOfViolence.update(
          { Mode: violenceMode },
          { where: { id: id } }
      );

      res.json({ message: "ModeOfViolence updated successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}
,

updateAgeGroup:async (req, res) => {
  const { id } = req.params;
  const { ageGroup } = req.body;
  const userId = req.userId; // Assuming userId is passed in the query

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role === 'Manager';

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with updating AgeGroup instance
      await AgeGroup.update(
          { AgeGroup: ageGroup },
          { where: { id: id } }
      );

      res.json({ message: "AgeGroup updated successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},



updateOrganization:async (req, res) => {
  const { id } = req.params;
  const { organizationName } = req.body;
  const userId = req.userId; // Assuming userId is passed in the query

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role === 'Manager';

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with updating Organization instance
      await Organization.update(
          { Name: organizationName },
          { where: { id: id } }
      );

      res.json({ message: "Organization updated successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},
updateRole:async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const userId = req.userId; // Assuming userId is passed in the query

  try {
      // Fetch user details along with associated profile and role
      const userDetails = await User.findByPk(userId, {
          include: [{
              model: Profile,
              include: Role // Include the Role associated with Profile
          }]
      });

      if (!userDetails) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has the role of "manager"
      const isManager = userDetails.Profile.Role.Role === 'Manager';

      if (!isManager) {
          return res.status(403).json({ error: "User does not have the required permissions" });
      }

      // If user is a manager, proceed with updating Role instance
      await Role.update(
          { Role: role },
          { where: { id: id } }
      );

      res.json({ message: "Role updated successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}


};
