const { Incident, Gender, AgeGroup, ModeOfViolence } = require('../models');
const sequelize = require("sequelize")

const fetchGenderData = async () => {
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

    res.json(genderData);
  } catch (error) {
    console.error('Error fetching gender data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};

const fetchAgeGroupData = async () => {
  try {
    const incidentCounts = await Incident.findAll({
      attributes: [
        'Victim_Id',
        [sequelize.fn('COUNT', sequelize.col('Victim_Id')), 'count']
      ],
      include: {
        model: AgeGroup,
        attributes: ['AgeGroup']
      },
      group: ['Victim_Id', 'AgeGroup.AgeGroup'],
      raw: true
    });

    const result = incidentCounts.reduce((acc, curr) => {
      acc[curr['AgeGroup.AgeGroup']] = parseInt(curr.count);
      return acc;
    }, {});

    console.log('Incident counts by age group:', result);
    return result;
  } catch (error) {
    console.error('Error counting incidents:', error);
    throw error;
  }
};

const fetchModeOfViolenceData = async () => {
  try {
    const incidentCounts = await Incident.findAll({
      attributes: [
        'Mode_Id',
        [sequelize.fn('COUNT', sequelize.col('Mode_Id')), 'count']
      ],
      include: {
        model: ModeOfViolence,
        attributes: ['Mode']
      },
      group: ['Mode_Id', 'ModeOfViolence.Mode'],
      raw: true
    });

    const result = incidentCounts.reduce((acc, curr) => {
      acc[curr['ModeOfViolence.Mode']] = parseInt(curr.count);
      return acc;
    }, {});

    console.log('Incident counts by mode of violence:', result);
    return result;
  } catch (error) {
    console.error('Error counting incidents:', error);
    throw error;
  }
  
};

const countIncidentsByAgeGroupAndModeOfViolence =async()=>{
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

    const result = incidentCounts.reduce((acc, curr) => {
      const ageGroup = curr['AgeGroup.AgeGroup'];
      const modeOfViolence = curr['ModeOfViolence.Mode'];
      if (!acc[ageGroup]) {
        acc[ageGroup] = {};
      }
      if (!acc[ageGroup][modeOfViolence]) {
        acc[ageGroup][modeOfViolence] = {
          ageGroupCount: parseInt(curr.ageGroupCount),
          modeOfViolenceCount: parseInt(curr.modeOfViolenceCount)
        };
      }
      return acc;
    }, {});

    console.log('Incident counts by age group and mode of violence:', result);
    return result;
  } catch (error) {
    console.error('Error counting incidents:', error);
    throw error;
  }
}

const countIncidentsByGenderAndAgeGroup= async()=>{
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

    const result = incidentCounts.reduce((acc, curr) => {
      const gender = curr['Gender.Gender'];
      const ageGroup = curr['AgeGroup.AgeGroup'];
      if (!acc[gender]) {
        acc[gender] = {};
      }
      if (!acc[gender][ageGroup]) {
        acc[gender][ageGroup] = {
          genderCount: parseInt(curr.genderCount),
          ageGroupCount: parseInt(curr.ageGroupCount)
        };
      }
      return acc;
    }, {});

    console.log('Incident counts by gender and age group:', result);
    return result;
  } catch (error) {
    console.error('Error counting incidents:', error);
    throw error;
  }
}
module.exports = { fetchGenderData, fetchAgeGroupData, fetchModeOfViolenceData };
