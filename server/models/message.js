const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Message extends Model {}
  
  Message.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Sender_Id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Room_Id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    // Removed sentAt field
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: true, // Enable timestamps
    createdAt: 'sentAt', // Map createdAt field to sentAt
    updatedAt: false // Disable updatedAt field if you don't need it
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Profile, {
      foreignKey: 'Sender_Id',
      onDelete: "CASCADE",
    });

    Message.belongsTo(models.Room, {
      foreignKey: "Room_Id",
      onDelete: "CASCADE",
    });
  };

  return Message;
};
