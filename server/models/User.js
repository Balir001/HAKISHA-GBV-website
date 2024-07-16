const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Is_Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Profile, {
      foreignKey: "User_Id",
      sourceKey: "id",
      allowNull: false,
      onDelete: "CASCADE",
    });
    User.hasOne(models.UserOTP, {
      foreignKey: "User_Id",
      sourceKey: "id",
      allowNull: false,
      onDelete: "CASCADE",
    });

    User.hasMany(models.Incident, {
      foreignKey: "User_Id",
      allowNull: false,
      onDelete: "CASCADE",
    });
  };

  // Hash the password before creating or updating a user
  User.beforeCreate(async (user) => {
    if (user.changed("Password")) {
      const hashedPassword = await bcrypt.hash(user.Password, 10);
      user.Password = hashedPassword;
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed("Password")) {
      const hashedPassword = await bcrypt.hash(user.Password, 10);
      user.Password = hashedPassword;
    }
  });

  return User;
};
