const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define("Organization", {

        

        Name: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        
    });

    Organization.associate = (models) => {
        Organization.hasMany(models.Profile, {
            foreignKey: 'Organization_Id', // Adjusted to camelCase
            onDelete: "CASCADE",
        });
    };

    return Organization;
};
