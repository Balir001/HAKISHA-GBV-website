
    const { Incident, Gender, AgeGroup, ModeOfViolence } = require('../models');
    const sequelize = require("sequelize")


    
    
    module.exports = {

        AgeGroupPie:async(req,res)=>{

          try {
            const ageGroupData = await AgeGroup.findAll({
              attributes: [
                'AgeGroup',
                [sequelize.fn('COUNT', sequelize.col('Incidents.id')), 'incidentCount']
              ],
              include: {
                model: Incident,
                attributes: []
              },
              group: ['AgeGroup.id'],
              raw: true
            });
        
            res.json(ageGroupData);
          } catch (error) {
            console.error('Error fetching age group data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }

        },
        GenderPie:async(req,res)=>{

          try {
            const genderData = await Gender.findAll({
              attributes: [
                'Gender',
                [sequelize.fn('COUNT', sequelize.col('Incidents.id')), 'incidentCount']
              ],
              include: {
                model: Incident,
                attributes: []
              },
              group: ['Gender.id'],
              raw: true
            });

            console.log(genderData)
        
            res.json(genderData);
          } catch (error) {
            console.error('Error fetching gender data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }

        },
        ModeOfViolencePie:async(req,res)=>{

          try {
            const modeOfViolenceData = await ModeOfViolence.findAll({
              attributes: [
                'Mode',
                [sequelize.fn('COUNT', sequelize.col('Incidents.id')), 'incidentCount']
              ],
              include: {
                model: Incident,
                attributes: []
              },
              group: ['ModeOfViolence.id'],
              raw: true
            });
        
            res.json(modeOfViolenceData);
          } catch (error) {
            console.error('Error fetching mode of violence data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }

        },

        countIncidentsByAgeGroupAndModeOfViolence:async(req,res)=>{

          try {
            const incidentCounts = await Incident.findAll({
              attributes: [
                'Victim_Id',
                'Mode_Id',
                [sequelize.fn('COUNT', sequelize.col('Victim_Id')), 'ageGroupCount'],
                [sequelize.fn('COUNT', sequelize.col('Mode_Id')), 'modeOfViolenceCount']
              ],
              include: [
                {
                  model: AgeGroup,
                  attributes: ['AgeGroup']
                },
                {
                  model: ModeOfViolence,
                  attributes: ['Mode']
                }
              ],
              group: ['Victim_Id', 'Mode_Id', 'AgeGroup.AgeGroup', 'ModeOfViolence.Mode'],
              raw: true
            });
        
            res.json(incidentCounts);
          } catch (error) {
            console.error('Error fetching incident counts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }

        },
        countIncidentsByGenderAndAgeGroup:async(req,res)=>{

          try {
            const incidentCounts = await Incident.findAll({
              attributes: [
                'gender_Id',
                'Victim_Id',
                [sequelize.fn('COUNT', sequelize.col('gender_Id')), 'genderCount'],
                [sequelize.fn('COUNT', sequelize.col('Victim_Id')), 'ageGroupCount']
              ],
              include: [
                {
                  model: Gender,
                  attributes: ['Gender']
                },
                {
                  model: AgeGroup,
                  attributes: ['AgeGroup']
                }
              ],
              group: ['gender_Id', 'Victim_Id', 'Gender.Gender', 'AgeGroup.AgeGroup'],
              raw: true
            });
        
            res.json(incidentCounts);
          } catch (error) {
            console.error('Error fetching incident counts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }

        },
      
      

    }