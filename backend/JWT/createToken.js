var jwt = require('jsonwebtoken');

module.exports = function createToken(id) {
   
  return jwt.sign({id }, process.env.JWT_SECRET_KEY, { expiresIn: '7days' });
}