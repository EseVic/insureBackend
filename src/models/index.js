const Sequelize = require('sequelize');
const { sequelize } = require('../config/config');
const logger = require('../config/logger');

// const sequelizeInstance = new Sequelize(sequelize.url);
const db = {};

const sequelizeInstance = new Sequelize(sequelize.database, sequelize.user, sequelize.password, {
  host: sequelize.host,
  dialect: sequelize.dialect,
  pool: {
    min: 0,
    max: 100,
    acquire: 5000,
    Idle: 1000,
  },
});

sequelizeInstance
  .authenticate()
  .then(() => logger.info('DB connected'))
  .catch((err) => {
    logger.error(err);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelizeInstance, Sequelize);
db.tokens = require('./token.model')(sequelizeInstance, Sequelize);
db.company = require('./company_profile.model')(sequelizeInstance, Sequelize);
db.record = require('./record.model')(sequelizeInstance, Sequelize);
db.leads = require('./leads.model')(sequelizeInstance, Sequelize);
db.agent = require('./agent.model')(sequelizeInstance, Sequelize);
db.clients = require('./clients.model')(sequelizeInstance, Sequelize);
db.claims = require('./claims.model')(sequelizeInstance, Sequelize);
db.pricing = require('./pricingPlan.model')(sequelizeInstance, Sequelize);
db.portfolio = require('./portfolio.model')(sequelizeInstance, Sequelize);
db.policy = require('./policy.model')(sequelizeInstance, Sequelize);
db.nextOfKin = require('./nextOfKin.model')(sequelizeInstance, Sequelize);
db.superAdmin = require('./superAdmin.model')(sequelizeInstance, Sequelize);
db.user_agents = require('./user_agents.model')(sequelizeInstance, Sequelize);
db.company_clients = require('./company_clients.model')(sequelizeInstance, Sequelize);
db.policy_company = require('./policy_company.model')(sequelizeInstance, Sequelize);
db.agent_clients = require('./agent_clients.model')(sequelizeInstance, Sequelize);
db.premiumTransaction = require('./premiumTransaction.model')(sequelizeInstance, Sequelize);

// relationships for models

db.users.hasOne(db.agent, {
  foreignKey:"userId"
});
db.agent.belongsTo(db.users);

db.agent.hasOne(db.company, {
  foreignKey:"companyId"
});
db.company.belongsTo(db.agent);

db.company.hasMany(db.agent);
db.agent.belongsTo(db.company);

db.record.hasOne(db.leads);
db.leads.belongsTo(db.record);

db.record.hasOne(db.clients);
db.clients.belongsTo(db.record);

// // db.pricing.hasOne(db.subscription);
// // db.subscription.belongsTo(db.pricing);

// // db.subscription.hasMany(db.company);
// // db.company.belongsTo(db.subscription);

db.clients.belongsToMany(db.company, { through: db.company_clients });
db.company.belongsToMany(db.clients, { through: db.company_clients });

db.clients.hasOne(db.nextOfKin);
db.nextOfKin.belongsTo(db.clients);

db.company.hasMany(db.policy);
db.policy.belongsTo(db.company);

db.premiumTransaction.hasMany(db.clients);
db.clients.belongsTo(db.premiumTransaction);

db.users.hasOne(db.portfolio);
db.portfolio.belongsTo(db.users);

db.agent.belongsToMany(db.clients, { through: db.agent_clients });
db.clients.belongsToMany(db.agent, { through: db.agent_clients });

module.exports = {
  db,
};
