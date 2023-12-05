module.exports = (sequelize, dataType) => {
  const client = sequelize.define('client', {
    policyNumber: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    premiumAmount: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    totalAmountPaid: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });
  return client;
};
