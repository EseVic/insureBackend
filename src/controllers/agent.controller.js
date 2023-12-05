const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, companyService} = require('../services');
const agentService = require("../services/agent.service")
// const { sendAgentRegistrationEmail } = require('../services/email.service');
const { Agent, User } = require('../models');
const company_profileModel = require('../models/company_profile.model');



const createAgent = async (req, res) => {
  try {
    const { userId, companyProfileId, firstName, lastName, middleName, gender, } = req.body;

    // Create agent
    const agent= await Agent.create({
      userId,
      companyProfileId,
      firstName,
      lastName,
      middleName,
      gender
    });

    res.status(201).json({ agent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.findAll({
      include: [{ model: User, model: company_profileModel, firstName, lastName, middleName, gender}],
    });

    res.status(200).json({ agents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAgentById = async (req, res) => {
  try {
    const { agentId } = req.params;

    // Fetch agent by ID
    const agent = await Agent.findByPk(agentId, {
      include: [{ model: User, company_profileId }],
    });

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.status(200).json({ agent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const { userId, companyProfileId, firstName, lastName, middleName, gender } = req.body;

    // Check if the agent exists
    const existingAgent = await Agent.findByPk(agentId);
    if (!existingAgent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Update agent
    await existingAgent.update({
      userId,
      companyProfileId,
      firstName,
      lastName,
      middleName,
      gender
    });

    res.status(200).json({ agent: existingAgent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAgent = async (req, res) => {
  try {
    const { agentId } = req.params;

    // Check if the agent exists
    const existingAgent = await Agent.findByPk(agentId);
    if (!existingAgent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Delete agent
    await existingAgent.destroy();

    res.status(204).send(); // No content after successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createAgent,
  getAgents,
  updateAgent,
  deleteAgent,
  getAgentById
};


// const createAgent = catchAsync(async (req, res) => {
//   const company = await companyService.getCompanyById(req.user.id)
//   const user = await userService.createUser({
//     phoneNumber:req.body.phoneNumber,
//     email:req.body.email,
//     password:"0000",
//     role: "agent"
//   })
  
//   // const agent = user.createAgent()
//   const agent = await agentService.createAgent({
//     userId: user.id,
//     companyId: req.user.id
//     // firstName:req.body.firstName,
//     // lastName: req.body.lastName,
//     // middleName: req.body.middleName,
//     // gender: req.body.gender
//   });
//   await sendAgentRegistrationEmail(user.email, company.companyName)
//   res.status(httpStatus.CREATED).send(agent);
// });

// // const createAgentAndClients = catchAsync(async (req, res) => {
// //   const agent = await agentClients.createAgentAndClients(req.body.clients, req.body.agent);
// //   res.status(httpStatus.CREATED).send(agent);
// // });

// const updateAgent = catchAsync(async (req, res) => {
//   const agent = await agent.updateAgent( req.body.agent);
//   res.status(httpStatus.CREATED).send(teacher);
// });

// const getAgentById = catchAsync(async (req, res) => {
//   const result = await agent.getAgent(req.params.agentId);
//   res.send(result);
// });

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user)
// });

// const updateUser = catchAsync(async (req, res) => {
//   const user = await userService.updateUserById(req.params.userId, req.body);
//   res.send(user);
// });

// const deleteUser = catchAsync(async (req, res) => {
//   await user_agentsModel.deleteUserById(req.params.userId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// module.exports = {
//   createAgent,
//   createAgent,
//   updateAgent,
//   getAgentById,
//   getUser,
//   updateUser,
//   deleteUser,
// };