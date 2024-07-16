const { UUIDV4 } = require("sequelize");

// Type.js
module.exports = (sequelize, DataTypes) => {
    const ModeOfViolence = sequelize.define("ModeOfViolence", {
        // ... other fields

      
        Mode: {
            type: DataTypes.STRING(25),
            allowNull: false
        }
    });

    ModeOfViolence.associate = (models) => {
        ModeOfViolence.hasMany(models.Incident, {
            foreignKey: 'Mode_Id',
            onDelete: 'CASCADE',
        });
    };

    return ModeOfViolence;
};
