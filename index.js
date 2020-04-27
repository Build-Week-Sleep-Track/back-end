const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const port = process.env.PORT || 4500;
const authRouter = require("./api/authRouter");
const userRouter = require("./api/userRouter");
const authenticator = require("./api/authenticator");
const db = require("./data/dbConfig");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/auth", authRouter);
server.use("/api/users", authenticator, userRouter);

server.get("/", (req, res) => {
  db("users")
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
