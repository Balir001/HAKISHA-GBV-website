const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },

    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 3] // Accepts strings with length between 1 and 3 characters
    }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middleName: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    TypeOfRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 3] // Accepts strings with length between 1 and 3 characters
    }
    },
    phoneNumber: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },

    User_Id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    Organization_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [1, 3] // Accepts strings with length between 1 and 3 characters
    }
    },
    Specialization_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [1, 3] // Accepts strings with length between 1 and 3 characters
    }
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: "User_Id",
      onDelete: "CASCADE",
      unique: true,
    });

    Profile.belongsTo(models.Organization, {
      foreignKey: "Organization_Id",
      onDelete: "CASCADE",
    });
    Profile.belongsTo(models.Role, {
      foreignKey: "TypeOfRole",
      onDelete: "CASCADE",
    });

    Profile.hasMany(models.FollowUp, {
      foreignKey: "Profile_Id",
      onDelete: "CASCADE",
    });

    Profile.belongsTo(models.Specialization, {
      foreignKey: "Specialization_Id",
      onDelete: "CASCADE",
    });

    Profile.hasMany(models.Message, {
      foreignKey: "Sender_Id",
      onDelete: "CASCADE",
    });
    
    Profile.hasMany(models.RoomMember, {
      foreignKey: "Profile_Id",
      onDelete: "CASCADE",
    });
    Profile.belongsTo(models.Gender, {
      foreignKey: "gender_Id",
      onDelete: "CASCADE",
    });
  };

  return Profile;
};
