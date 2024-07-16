const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const RoomMember = sequelize.define("RoomMember", {
       
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        Profile_Id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        Room_Id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },

    });

    RoomMember.associate = (models) => {
        RoomMember.belongsTo(models.Profile, {
            foreignKey: 'Profile_Id', // Adjusted to camelCase
            onDelete: "CASCADE",
        });
    
        RoomMember.belongsTo(models.Room, {
            foreignKey: "Room_Id", // Adjusted to camelCase
            onDelete: "CASCADE",
        });
    };
   


    return RoomMember;
};
