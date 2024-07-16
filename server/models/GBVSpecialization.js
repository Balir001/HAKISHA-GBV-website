const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Specialization = sequelize.define("Specialization", {
        type: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        Profile_Id: {
            type: DataTypes.UUID,
            allowNull: true
        },

    });

    Specialization.associate = (models) => {
        Specialization.hasMany(models.Profile, {
            foreignKey: 'Specialization_Id', // Adjusted to camelCase
            onDelete: "CASCADE",
        });
    };

    return Specialization;
};
