module.exports = (sequelize, dataType) => {
  const claim = sequelize.define('claim', {
    status: {
      type: dataType.ENUM('filed', 'in progress', 'approve'),
      allowNull: true,
    },
    claimsAmount: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });
  return claim;
};
