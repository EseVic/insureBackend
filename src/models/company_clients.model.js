module.exports = (sequelize, dataType) => {
    const companyClients = sequelize.define('company_clients', {
      company_profileId: {
        type: dataType.INTEGER,
        allowNull: false,
      },
      clientsId: {
        type: dataType.INTEGER,
        allowNull: false,
      },
    });
    return companyClients;
  };