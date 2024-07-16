const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const RoomType = sequelize.define("RoomType", {
       
        RoomType: {
            type: DataTypes.STRING(15),
            allowNull: false
        },

    });

    RoomType.associate = (models) => {
        RoomType.hasMany(models.Room, {
            foreignKey: 'Room_Type', // Adjusted to camelCase
            onDelete: "CASCADE",
        });
    };

    return RoomType;
};
