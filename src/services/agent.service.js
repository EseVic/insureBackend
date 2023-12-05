const { db } = require('../models');
const getAbsentValues = require('../utils/array-compararer');
const { agentModel } = require('../models');

const getAgentById = async (agentId) => {
  return await agentModel.findByPk(agentId);
};

const updateAgent = async (agentId, agentData) => {
  const agent = await getAgentById(agentId);
  if (!agent) {
    return null;
  }
  return await agent.update(agentData);
};

const deleteAgent = async (agentId) => {
  const agent = await getAgentById(agentId);
  if (agent) {
    await agent.destroy();
  }
};

module.exports = {
  getAgentById,
  updateAgent,
  deleteAgent,
};




// const { db } = require('../models');
// const getAbsentValues = require('../utils/array-compararer');

// /**
//  * creates a agent given agent model
//  * @param {Object} agentBody
//  * @returns {Promise<Object>}
//  */
// const createAgent = async (agentBody) => {
//   return db.agent.create(agentBody);
// };

// /**
//  * gets agents by Id
//  * @param {*} agentId
//  * @returns
//  */
// const getAgent = async (agentId) => {
//   const result = await db.agent.findOne({
//     where: { id: agentId },
//     // include: db.clients,
//   });
//   return result;
// };

// /**
//  * creates a agents 
// //  * @param {Object} clients
//  * @param {Object} agent
//  * @returns
//  */


// /**
//  * updates agent profile with subjects
// //  * @param {*} clients
//  * @param {*} agent
//  * @returns
//  */
// const updateAgent = async ( agent) => {
//   await db.agent.update(agent, {
//     where: {
//       id: agent.id,
//     },
//   });

//   const existingAgent = await db.agent.findAll({
//     where: {
//       agentId: agent.id,
//     },
//   });

//   const toDelete = getAbsentValues(existingAgent, agent, 'agentId');
//   const toCreate = getAbsentValues(agent, existingAgent, 'agentId');

//   return { toDelete, toCreate };
// };

// module.exports = {
//   createAgent,
//   createAgent,
//   getAgent,
//   updateAgent,
// };