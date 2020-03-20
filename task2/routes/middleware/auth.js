const jwt = require("jsonwebtoken");
const secret = require("../../config/auth").secret;

module.exports = (req, res, next) => {
  const [token_type, jwt_token] = req.headers["authorization"].split(" ");

  try {
    let user = jwt.verify(jwt_token, secret);
    req.user = user;
  } catch (err) {
    req.user = null;
  }

  next();
};
