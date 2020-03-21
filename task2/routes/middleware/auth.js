const jwt = require("jsonwebtoken");
const secret = require("../../config/auth").secret;

module.exports = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  const [token_type, jwt_token] = req.headers["authorization"].split(" ");
  try {
    let user = jwt.verify(jwt_token, secret);
    req.user = user;
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  next();
};
