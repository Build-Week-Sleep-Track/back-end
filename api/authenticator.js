const jwtConfig = require("../utils/jwtConfig");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtConfig.secret, (err, decrypted) => {
      if (err) {
        res.status(401).json({ error: "forbidden" });
      } else {
        req.decrypted = decrypted;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "please provide user info" });
  }
};
