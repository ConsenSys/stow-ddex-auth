module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    address: {
      type: DataTypes.STRING,
      required: true,
      primaryKey: true,
      unique: true,
      set(val) {
        this.setDataValue('address', val.toLowerCase());
      }
    },
    activationCode: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    name: DataTypes.STRING,
    website: DataTypes.STRING,
    org: DataTypes.STRING,
    picture: DataTypes.STRING,
  });

  return Profile;
};
