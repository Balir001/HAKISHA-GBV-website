const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const FollowUp = sequelize.define("FollowUp", {
        Incident_Id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
        Profile_Id: {
            type: DataTypes.UUID,
            allowNull: true
        },
    });

    FollowUp.associate = (models) => {
        FollowUp.belongsTo(models.Profile, {
            foreignKey: 'Profile_Id',
            onDelete: "CASCADE",
        });

        FollowUp.belongsTo(models.Incident, {
            foreignKey: 'Incident_Id',
        });
    };

    return FollowUp;
};
