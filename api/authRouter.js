const express = require("express");
const router = express.Router();
const Utils = require("../utils/helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/jwtConfig");

//post route to register, hashes password and saves to database with hashed password instead of plain text

router.post("/register", (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  const rounds = process.env.HASH_ROUNDS || 12;
  const hashed = bcrypt.hashSync(password, rounds);
  const user = { email, password: hashed, first_name, last_name };

  Utils.addUser(user)
    .then((u) => {
      res.status(201).json(u);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

///checks for user, compares hashed password and returns a token if correct credentials providied. If incorrect credentials are provided, returns 401 with forbidden message.

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  //checks to make sure email and password are present
  !email
    ? res.status(400).json({ message: "must include email" })
    : !password
    ? res.status(400).json({ message: "must include password" })
    : !email && !password
    ? res.status(400).json({ message: "must include email and password" })
    : //if password and email are present, procceed to authenticaiton
      Utils.login(req.body)
        .then(([user]) => {
          if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateToken({
              id: user.id,
              email: user.email,
            });

            res.status(200).json({
              user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
              },
              message: `Welcome back, ${user.first_name}`,
              token,
            });
          } else {
            res.status(401).json({ message: "forbidden" });
          }
        })
        .catch((err) => res.status(500).json({ error: err }));
});

//generates JWT token

function generateToken(payload) {
  return jwt.sign(payload, config.secret, config.options);
}

module.exports = router;
