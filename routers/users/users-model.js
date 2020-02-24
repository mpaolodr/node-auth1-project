const db = require("../../data/db-config.js");

function get() {
  return db("users").select("id", "username");
}

module.exports = {
  get
};
