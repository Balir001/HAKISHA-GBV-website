const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
       
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        Room_Type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 2] // Accepts strings with length between 1 and 3 characters
            }
        },

    });

    Room.associate = (models) => {
        Room.hasMany(models.RoomMember, {
            foreignKey: 'Room_Id', // Adjusted to camelCase
            onDelete: "CASCADE",
        });
   
        Room.hasMany(models.Message, {
            foreignKey: "Room_Id", // Adjusted to camelCase
            onDelete: "CASCADE",
        });
        Room.belongsTo(models.RoomType, {
            foreignKey: "Room_Type", // Adjusted to camelCase
            onDelete: "CASCADE",
        });
    };

    return Room;
};
