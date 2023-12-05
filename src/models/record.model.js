const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const record = sequelize.define('record', {
    firstName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    middleName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    gender: {
      type: dataType.ENUM('male', 'female'),
      allowNull: false,
      trim: true,
    },
    Adress: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    phoneNumber: {
      type: dataType.INTEGER,
      allowNull: false,
      trim: true,
    },
    role: {
      type: dataType.ENUM('leads', 'clients'),
      allowNull: false,
      trim: true,
    },
  });

  return record;
};
