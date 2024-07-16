const { Model } = require("sequelize");
  
module.exports = (sequelize, DataTypes) => {
const UserOTP = sequelize.define(
    "UserOTP",
    {
      User_Id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      attempts: {
        type: DataTypes.INTEGER // Corrected data type to INTEGER
      }
    }
  );
  UserOTP.associate = (models) => {
    UserOTP.belongsTo(models.User, {
      foreignKey: "User_Id",})
    }

  return UserOTP;
}
  