module.exports = (sequelize, dataType) => {
  const leads = sequelize.define('lead', {
    status: {
      type: dataType.ENUM('new', 'in progress', 'closed'),
      allowNull: false,
    },
  });
  return leads;
};
