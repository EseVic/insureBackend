// agent.controller.js
const { Agent, User } = require('../models');

const createAgent = async (req, res) => {
  try {
    const { userId, firstName, lastName, /* other fields */ } = req.body;

    // Create agent
    const agent = await Agent.create({
      userId,
      firstName,
      lastName,
      // ... other fields
    });

    res.status(201).json({ agent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.findAll({
      include: [{ model: User, /* include user attributes if needed */ }],
    });

    res.status(200).json({ agents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other controller methods (updateAgent, deleteAgent, etc.) can be added similarly

module.exports = {
  createAgent,
  getAgents,
  // Other controller methods
};



// agent.routes.js
const express = require('express');
const agentController = require('../controllers/agent.controller');

const router = express.Router();

router.post('/agents', agentController.createAgent);
router.get('/agents', agentController.getAgents);
// Define other agent routes

module.exports = router;


// app.js or index.js
const express = require('express');
const agentRoutes = require('./routes/agent.routes');

const app = express();

// Other configurations

// Use agent routes
app.use('/api', agentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// agent.model.js
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    // ... other fields
  });

  return Agent;
};



Agent Controller (agent.controller.js):
Implement controller methods to handle agent operations:

javascript
Copy code


// agent.controller.js
const { Agent, User } = require('../models');

const createAgent = async (req, res) => {
  try {
    const { userId, firstName, lastName, /* other fields */ } = req.body;

    // Create agent
    const agent = await Agent.create({
      userId,
      firstName,
      lastName,
      // ... other fields
    });

    res.status(201).json({ agent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAgentById = async (req, res) => {
  try {
    const { agentId } = req.params;

    // Fetch agent by ID
    const agent = await Agent.findByPk(agentId, {
      include: [{ model: User, /* include user attributes if needed */ }],
    });

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.status(200).json({ agent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other controller methods (updateAgent, deleteAgent, etc.) can be added similarly

module.exports = {
  createAgent,
  getAgentById,
  // Other controller methods
};