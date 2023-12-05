const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const { db } = require('../models');

/**
 * Verify the callback function.
 *
 * @param {Object} req - The request object.
 * @param {Function} resolve - The resolve function.
 * @param {Function} reject - The reject function.
 * @param {Array} requiredRights - An array of required rights.
 * @return {Promise} Resolves if the callback is verified.
 */
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, agent, info) => {
  if (err || info || !agent) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
}
/**
 * Middleware to check if the user is an agent
 */
const agentMiddleware = (req, res, next) => {
  try {
    // Assuming you have stored user information in req.user during authentication
    const { role } = req.user;

    if (role !== 'agent') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Access forbidden. User is not an agent.');
    }

    // If the user is an agent, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = agentMiddleware