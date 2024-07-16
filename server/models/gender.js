const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Gender = sequelize.define("Gender", {
       
        Gender: {
            type: DataTypes.STRING(8),
            allowNull: false
        },
    });

    Gender.associate = (models) => {
        Gender.hasMany(models.Profile, {
            foreignKey: 'gender_Id', // Adjusted to camelCase
            onDelete: "CASCADE",
        });
        Gender.hasMany(models.Incident, {
            foreignKey: 'gender_Id', // Adjusted to camelCase
            onDelete: "CASCADE",
        })
    };

    return Gender;
};
