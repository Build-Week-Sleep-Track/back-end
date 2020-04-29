const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const authenticator = require("./authenticator");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/auth", authRouter);
server.use("/api/users", authenticator, userRouter);

module.exports = server;
