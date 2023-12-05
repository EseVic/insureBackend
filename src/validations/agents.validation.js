const express = require('express');
const { Joi } = require('joi');
const agent = require('../middlewares/agent');
// const agentController = require('../../controllers/agent.controller');

// const router = express.Router();

// router
//   .route('/')
//   .post(
//     agent('createAgent'),
//     Joi({
//       body: Joi.object({
//         phoneNumber: Joi.string().required(),
//         email: Joi.string().email().required(),
//         // Add more fields and validation as needed
//       }),
//     }),
//     agentController.createAgent
//   )
//   .get(auth('getAgents'), agentController.getAgents);

// router
//   .route('/:agentId')
//   .get(
//     auth('getAgent'),
//     celebrate({
//       params: Joi.object({
//         agentId: Joi.string().required(),
//       }),
//     }),
//     agentController.getAgent
//   )
//   .put(
//     auth('updateAgent'),
//     celebrate({
//       params: Joi.object({
//         agentId: Joi.string().required(),
//       }),
//       body: Joi.object({
//         hasChangedPassword: Joi.boolean(),
//         firstName: Joi.string().trim(),
//         lastName: Joi.string().trim(),
//         middleName: Joi.string().trim(),
//         gender: Joi.string().valid('male', 'female'),
//         // Add more fields and validation as needed
//       }),
//     }),
//     agentController.updateAgent
//   )
//   .delete(
//     auth('deleteAgent'),
//     celebrate({
//       params: Joi.object({
//         agentId: Joi.string().required(),
//       }),
//     }),
//     agentController.deleteAgent
//   );

// module.exports = router;



// const Joi = require('joi');

module.exports = {
  createAgent: {
    body: Joi.object({
      phoneNumber: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8), 
    }),
  },

  getAgents: {
    // You can add validation for query parameters if needed
  },
  getAgent: {
    params: Joi.object({
      agentId: Joi.string().required(),
    }),
  },
  updateAgent: {
    params: Joi.object({
      agentId: Joi.string().required(),
    }),
    body: Joi.object({
      hasChangedPassword: Joi.boolean(),
      firstName: Joi.string().trim(),
      lastName: Joi.string().trim(),
      middleName: Joi.string().trim(),
      gender: Joi.string().valid('male', 'female'),
      // Add more fields and validation as needed
    }),
  },
  deleteAgent: {
    params: Joi.object({
      agentId: Joi.string().required(),
    }),
  },
};
