require("dotenv").config();
const PORT = 8080;
const express = require("express");
const server = express();
const morgan = require("morgan");
const apiRouter = require("./api");
const { client } = require("./client");
client.connect();
