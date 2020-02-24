require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sessions = require("express-session");
const KnexSessionsStore = require("connect-session-knex")(sessions);

const knex = require("../data/db-config.js");

const server = express();

const sessionConfig = {
  name: "login_cookie",
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  store: new KnexSessionsStore({
    knex,
    createTable: true,
    clearInterval: 1000 * 60 * 10,
    sidfieldname: "sid",
    tablename: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    httpOnly: true,
    secure: false
  }
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfig));

server.get("/", (req, res) => {
  res.status(200).json({ api: "is live!" });
});

module.exports = server;
