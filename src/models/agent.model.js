module.exports = (sequelize, dataType) => {
  const agent = sequelize.define('agent', {
    // userId:{
    //   type: dataType.STRING,
    //   allowNull: false,
    // },
    // companyId:{
    //   type: dataType.STRING,
    //   allowNull: false,
    // },
    hasChangedPassword: {
      type: dataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    firstName: {
      type: dataType.STRING,
      allowNull: true,
      trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: true,
      trim: true,
    },
    middleName: {
      type: dataType.STRING,
      allowNull: true,
      trim: true,
    },
    gender: {
      type: dataType.ENUM('male', 'female'),
      allowNull: true,
      trim: true,
    },
  });

  agent.associate = (models) => {
    agent.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    agent.associate = (companyProfile) => {
      agent.belongsTo(model.companyProfile, {
        foreignKey: 'companyProfileId',
        onDelete: 'CASCADE',
      });
    };
  };

  return agent;
};
