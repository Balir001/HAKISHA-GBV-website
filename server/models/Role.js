const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
       
        Role: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
    });

    Role.associate = (models) => {
        Role.hasMany(models.Profile, {
            foreignKey: 'TypeOfRole', // Adjusted to camelCase
            onDelete: "CASCADE",
        });
    };

    return Role;
};


