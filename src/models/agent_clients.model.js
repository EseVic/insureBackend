module.exports = (sequelize, dataType) => {
  const agentClients = sequelize.define('agent_clients', {
    agentId: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    clientsId: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });
  return agentClients;
};
