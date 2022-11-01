require("dotenv").config();
const PORT = 8080;
const express = require("express");
const server = express();
const morgan = require("morgan");
const apiRouter = require("./api");
const { client } = require("./client");
client.connect();

server.use(express.json());
server.use(morgan("dev"));

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
