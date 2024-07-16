module.exports = (sequelize, DataTypes) => {
    const AgeGroup = sequelize.define("AgeGroup", {
        
        AgeGroup: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
       
    });

    AgeGroup.associate = (models) => {
       

        AgeGroup.hasMany(models.Incident, {
            foreignKey: 'Victim_Id',
            onDelete: 'CASCADE',
        });
    };

    return AgeGroup;
};
