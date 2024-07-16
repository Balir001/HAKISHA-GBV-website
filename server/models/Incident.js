const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Incident = sequelize.define("Incident", {
        
        
        latitude: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false
        },
        gender_Id:{

            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 2] // Accepts strings with length between 1 and 3 characters
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Victim_Id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        User_Id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        Mode_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 3] // Accepts strings with length between 1 and 3 characters
            }
        },
    });

    Incident.associate = (models) => {
        Incident.belongsTo(models.AgeGroup, {
            foreignKey: 'Victim_Id',
            allowNull:false
        });

        Incident.belongsTo(models.User, {
            foreignKey: 'User_Id',
            allowNull:false
            
        });
        Incident.belongsTo(models.ModeOfViolence, {
            foreignKey: 'Mode_Id',
            allowNull:false
            
        });

        Incident.hasMany(models.FollowUp, {
            foreignKey: 'Incident_Id',
            onDelete: "CASCADE",
        });

        Incident.belongsTo(models.Gender, {
            foreignKey: 'gender_Id',
            allowNull:false
            
        });



    };

    return Incident;
};
